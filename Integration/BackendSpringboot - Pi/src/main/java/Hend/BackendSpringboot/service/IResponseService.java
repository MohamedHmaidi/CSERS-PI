package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.Response;

import java.util.List;

public interface IResponseService {
    public List<Response> retrieveAllResponses();
    public Response retrieveResponse(Long responseId);
    public Response addResponse(Response c);
    public void removeResponse(Long responseId);
    public Response modifyResponse(Response response);
}
