package org.building.pm.controller;

import org.building.pm.service.sxdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * Created by admin on 2017/10/31.
 */
@Controller
@RequestMapping("/app/pm/sxd")
public class sxdController {
    @Autowired
    private sxdService sxdService;


}



