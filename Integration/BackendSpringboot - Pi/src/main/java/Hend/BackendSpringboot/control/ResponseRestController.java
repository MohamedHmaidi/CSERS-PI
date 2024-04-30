package Hend.BackendSpringboot.control;

import Hend.BackendSpringboot.entity.Response;
import Hend.BackendSpringboot.service.IResponseService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/response")
public class ResponseRestController {
    IResponseService responseService;
    // http://localhost:8089/csers/response/retrieve-all-responses
    @GetMapping("/retrieve-all-responses")
    public List<Response> getResponses() {
        List<Response> listResponses = responseService.retrieveAllResponses();
        return listResponses;
    }
    // http://localhost:8089/csers/response/retrieve-response/8
    @GetMapping("/retrieve-response/{response-id}")
    public Response retrieveResponse(@PathVariable("response-id") Long chId) {
        Response response = responseService.retrieveResponse(chId);
        return response;
    }
    // http://localhost:8089/csers/response/add-response
    @PostMapping("/add-response")
    public Response addResponse(@RequestBody Response c) {
        Response response = responseService.addResponse(c);
        return response;
    }
    // http://localhost:8089/csers/response/remove-response/{response-id}
    @DeleteMapping("/remove-response/{response-id}")
    public void removeResponse(@PathVariable("response-id") Long chId) {
        responseService.removeResponse(chId);
    }
    // http://localhost:8089/csers/response/modify-response
    @PutMapping("/modify-response")
    public Response modifyResponse(@RequestBody Response c) {
        Response response = responseService.modifyResponse(c);
        return response;
    }
}
