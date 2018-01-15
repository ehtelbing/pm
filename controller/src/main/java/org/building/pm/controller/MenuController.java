package org.building.pm.controller;

import org.building.pm.service.MenuService;
import org.building.pm.service.TreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by hp on 2018/1/13.
 */
@Controller
@RequestMapping("/app/pm/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @Autowired
    private TreeService treeService;

    @RequestMapping(value = "topMenu", method = RequestMethod.POST)
    @ResponseBody
    public List<Object> topMenu(String IS_V_ROLECODE,
                                 String IS_V_SYSTYPE,
                                 String V_V_DEPTCODE,
                                 String V_V_HOME_MENU) {

        List<Object> result = menuService.getMenuData(IS_V_ROLECODE, IS_V_SYSTYPE,V_V_DEPTCODE, V_V_HOME_MENU);

        return result;
    }


}
