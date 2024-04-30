package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.Claim;
import Hend.BackendSpringboot.entity.Response;
import Hend.BackendSpringboot.entity.User;
import lombok.AllArgsConstructor;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class ArtificialResponseServiceImpl implements IArtificialResponseSerice{
    IResponseService responseService;
    private final String GEMINI_API_KEY = "AIzaSyAfdDTC6ZaTvFLM5s0o_g131Hf8pDT8B3E"; // Replace with your Gemini API key
    private final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=";

    public String generateResponse(Claim claim) {
        //=== Setup the Rest Template for Post ===
        //Prompt Instructions
        String promptInstructions = "You are an an AI assistant trained to be informative and comprehensive. " +
                "You will be submitted claims from users regarding issues they faced within the platform." +
                "You are assigned to a comprehensive system that manages user-submitted claims and corresponding responses, providing a system for issue resolution, suggestion, feedback and communication." +
                "For your information the overall platform that the system you're assigned to is part of, handles emergencies that are submitted by users near the university, staff members that help and logistics and awareness training. You are not to handle these tasks but strictly issue resolution, suggestion, feedback concerning the platform itself or the services provided." +
                "Start your message by saying: \"Hello, I'm an AI Bot and I'm here to suggest initial procedures, a manual response will be followed by an Admin if deemed necessary,\" " +
                "If you feel that a user's claim is off topic, please let them know that it cannot be handled." +
                "You do not expect a response, you do not help further, your whole response is made in a single message, no further." +
                "If you don't have enough information to resolve the issue, try to help as much as possible through suggestions before asking the user to add more information so that the admin sees it and that an admin will take it from here." +
                "If an issue pertaining to the staff team happens let them know that we apologize deeply and that the staff team is alerted of their claim." +
                "The following is the user's claim: ";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("contents", new JSONArray().put(new JSONObject().put("parts", new JSONArray().put(new JSONObject().put("text", promptInstructions + claim.getDescription())))));
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);
        String finalUrl = GEMINI_API_URL + GEMINI_API_KEY;
        ResponseEntity<String> response = restTemplate.postForEntity(finalUrl, entity, String.class);

        //=== Extract Text from Response body ===
        String extractedText = "";
        try {
            JSONObject jsonObject = new JSONObject(response.getBody());
            JSONArray candidatesArray = jsonObject.getJSONArray("candidates");
            JSONObject firstCandidate = candidatesArray.getJSONObject(0);
            JSONObject contentObject = firstCandidate.getJSONObject("content");
            JSONArray partsArray = contentObject.getJSONArray("parts");
            JSONObject firstPart = partsArray.getJSONObject(0);
            extractedText = firstPart.getString("text");
        } catch (JSONException e) {
            e.printStackTrace();
            // Handle potential parsing errors
        }

        //=== Submit the AI Response ===
        Response AIResponse = new Response();
        AIResponse.setClaim(claim);
        AIResponse.setDate(new Date());
        AIResponse.setContent(extractedText);
        User existingUser = new User();
        existingUser.setId_user(50);
        AIResponse.setUser(existingUser);
        responseService.addResponse(AIResponse);

        return extractedText;
    }

    public Claim.ClassificationType generateClassification(Claim claim){
        String classification = "";
        //=== Setup the Rest Template for Post ===
        //Prompt Instructions
        String promptInstructions = "You are an an AI assistant trained to be informative and comprehensive. " +
                "You will be submitted claims from users regarding issues they faced within the platform." +
                "You are assigned to a comprehensive system that manages user-submitted claims and corresponding responses, providing a system for issue resolution, suggestion, feedback and communication." +
                "For your information the overall platform that the system you're assigned to is part of, handles emergencies that are submitted by users near the university, staff members that help and logistics and awareness training. You are not to handle these tasks but strictly issue resolution, suggestion, feedback concerning the platform itself or the services provided." +
                "Your task is to attribute a classification level according to the user claim importance and user attitude." +
                "The classifications are: ' Very urgent, Urgent, Regular, Off-topic '. " +
                "Give me an output containing Exactly one of those 4 classification, no other words." +
                "The following is the user's claim: ";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("contents", new JSONArray().put(new JSONObject().put("parts", new JSONArray().put(new JSONObject().put("text", promptInstructions + claim.getDescription())))));
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);
        String finalUrl = GEMINI_API_URL + GEMINI_API_KEY;
        ResponseEntity<String> response = restTemplate.postForEntity(finalUrl, entity, String.class);

        //=== Extract Text from Response body ===
        String extractedText = "";
        try {
            JSONObject jsonObject = new JSONObject(response.getBody());
            JSONArray candidatesArray = jsonObject.getJSONArray("candidates");
            JSONObject firstCandidate = candidatesArray.getJSONObject(0);
            JSONObject contentObject = firstCandidate.getJSONObject("content");
            JSONArray partsArray = contentObject.getJSONArray("parts");
            JSONObject firstPart = partsArray.getJSONObject(0);
            extractedText = firstPart.getString("text");
        } catch (JSONException e) {
            e.printStackTrace();
            // Handle potential parsing errors
        }


        switch (extractedText.toLowerCase()) {
            case "very urgent":
                return Claim.ClassificationType.VERY_URGENT;
            case "urgent":
                return Claim.ClassificationType.URGENT;
            case "regular":
                return Claim.ClassificationType.REGULAR;
            case "off-topic":
                return Claim.ClassificationType.OFF_TOPIC;
            default:
                // Handle unknown classification or set a default value
                return Claim.ClassificationType.REGULAR;
        }
    }

    public String correctSpelling(Claim claim){
        String classification = "";
        //=== Setup the Rest Template for Post ===
        //Prompt Instructions
        String promptInstructions = "You will be given a text, strictly correct the spelling, don't say anything extra and only give back the corrected text, fix all the possible spelling errors." +
                "The following is the text: ";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("contents", new JSONArray().put(new JSONObject().put("parts", new JSONArray().put(new JSONObject().put("text", promptInstructions + claim.getDescription())))));
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);
        String finalUrl = GEMINI_API_URL + GEMINI_API_KEY;
        ResponseEntity<String> response = restTemplate.postForEntity(finalUrl, entity, String.class);

        //=== Extract Text from Response body ===
        String extractedText = "";
        try {
            JSONObject jsonObject = new JSONObject(response.getBody());
            JSONArray candidatesArray = jsonObject.getJSONArray("candidates");
            JSONObject firstCandidate = candidatesArray.getJSONObject(0);
            JSONObject contentObject = firstCandidate.getJSONObject("content");
            JSONArray partsArray = contentObject.getJSONArray("parts");
            JSONObject firstPart = partsArray.getJSONObject(0);
            extractedText = firstPart.getString("text");
        } catch (JSONException e) {
            e.printStackTrace();
            // Handle potential parsing errors
        }

        return extractedText;
    }
}
