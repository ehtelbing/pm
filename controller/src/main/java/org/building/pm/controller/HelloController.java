package org.building.pm.controller;

import org.building.pm.service.HelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 示例的控制器
 */

@Controller
@RequestMapping("/app/pm/hello")
public class HelloController {

    @Autowired
    private HelloService helloService;

    @RequestMapping(value = "page", method = RequestMethod.GET)
    public String helloPage(HttpServletRequest request) {
        request.setAttribute("name", "Mars");
        request.setAttribute("copyright", helloService.getCopyright());
        return "hello";
    }

    @RequestMapping(value = "json", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> helloJson() {
        Map<String, Object> result = new HashMap<>();
        result.put("name", "Mars");
        result.put("copyright", helloService.getCopyright());
        return result;
    }
}
