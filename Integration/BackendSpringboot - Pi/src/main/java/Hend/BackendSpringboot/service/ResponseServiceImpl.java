package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.Response;
import Hend.BackendSpringboot.repository.ResponseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ResponseServiceImpl implements IResponseService{
    ResponseRepository responseRepository;
    public List<Response> retrieveAllResponses() {
        return responseRepository.findAll();
    }
    public Response retrieveResponse(Long responseId) {
        return responseRepository.findById(responseId).get();
    }
    public Response addResponse(Response c) {
        return responseRepository.save(c);
    }
    public void removeResponse(Long responseId) {
        responseRepository.deleteById(responseId);
    }
    public Response modifyResponse(Response response) {
        return responseRepository.save(response);
    }
}
