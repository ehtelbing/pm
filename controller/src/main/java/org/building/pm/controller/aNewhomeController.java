package org.building.pm.controller;
import org.building.pm.service.AnewhomeService;
import org.building.pm.service.BasicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/app/pm/anewhome/")
public class aNewhomeController {
    @Autowired
    private AnewhomeService anewhomeService;

    //===========update2018-10-08  主页返回菜单
    @RequestMapping(value = "SEL_MENU_HOME", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SEL_MENU_HOME(
            @RequestParam(value = "IS_V_ROLECODE") String IS_V_ROLECODE,
            @RequestParam(value = "IS_V_SYSTYPE") String IS_V_SYSTYPE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "SING_ID") String SING_ID
            )
            throws SQLException {
        Map<String, Object> result = anewhomeService.SEL_MENU_HOME(IS_V_ROLECODE,IS_V_SYSTYPE,V_V_DEPTCODE,SING_ID);
        return result;
    }

    @RequestMapping(value = "sel_menu_tree_id", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> sel_menu_tree_id(
            @RequestParam(value = "IS_V_ROLECODE") String IS_V_ROLECODE,
            @RequestParam(value = "IS_V_SYSTYPE") String IS_V_SYSTYPE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_MENUCODE") String V_V_MENUCODE)
            throws SQLException {
        List<Map> result = anewhomeService.sel_menu_tree_id(IS_V_ROLECODE,IS_V_SYSTYPE,V_V_DEPTCODE,V_V_MENUCODE);
        return result;
    }

}
