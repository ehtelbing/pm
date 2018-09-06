package org.building.pm.controller;/**
 * Created by Administrator on 2018/9/4 0004.
 */
import org.building.pm.service.ReStartPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequestMapping("/app/pm/reStart")
public class ReStartPController{

        @Autowired
        private ReStartPService reStartPService;

        @RequestMapping(value = "/SELECT_RESTARTP", method = RequestMethod.POST)
        @ResponseBody
        public Map<String, Object> SELECT_RESTARTP(
                @RequestParam(value = "FLOW_CODE") String FLOW_CODE) throws Exception {
            Map<String, Object> data = reStartPService.SELECT_RESTARTP(FLOW_CODE);
            return data;
        }
}
