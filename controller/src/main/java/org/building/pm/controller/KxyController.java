package org.building.pm.controller;

import org.building.pm.service.KxyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.*;


@Controller
@RequestMapping("/app/pm/Kxy")
public class KxyController {
    @Autowired
    private KxyService kxyService;


    @RequestMapping(value = "/userFavoriteMenu", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> userFavoriteMenu(@RequestParam(value = "A_USERID") String A_USERID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap operator = new HashMap<String, Object>();
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = kxyService.userFavoriteMenu(A_USERID);
        List<Map<String, Object>> list = (List) data.get("list");
        if (list != null) {
            if (list.size() > 0) {
                Map<String, Object> userMenu;
                for (int i = 0; i < list.size(); i++) {
                    userMenu = list.get(i);
                    userMenu.put("leaf", true);
                }
            }
        }
        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/insertFavoriteMenu", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> insertFavoriteMenu(@RequestParam(value = "A_USERID") String A_USERID, @RequestParam(value = "A_MENUID") String A_MENUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = kxyService.insertFavoriteMenu(A_USERID, A_MENUID);
        return data;
    }

    @RequestMapping(value = "/insertFavoriteMenuList", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> insertFavoriteMenuList(@RequestParam(value = "A_USERID") String A_USERID, @RequestParam(value = "MENUID_LIST") List<String> MENUID_LIST, HttpServletRequest request, HttpServletResponse response) throws SQLException {

        return kxyService.insertFavoriteMenuList(A_USERID, MENUID_LIST);

    }

    @RequestMapping(value = "/deleteFavoriteMenu", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> deleteFavoriteMenu(@RequestParam(value = "A_USERID") String A_USERID, @RequestParam(value = "A_MENUID") String A_MENUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = kxyService.deleteFavoriteMenu(A_USERID, A_MENUID);
        return data;
    }

    @RequestMapping(value = "/setHomeMenu", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> setHomeMenu(@RequestParam(value = "A_USERID") String A_USERID, @RequestParam(value = "A_MENUID") String A_MENUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = kxyService.setHomeMenu(A_USERID, A_MENUID);
        return data;
    }

    @RequestMapping(value = "/getHomeMenu", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getHomeMenu(@RequestParam(value = "A_USERID") String A_USERID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = kxyService.getHomeMenu(A_USERID);
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_MENU_FAVORITE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_NEW_MENU_SEL(
            @RequestParam(value = "IS_V_ROLECODE") String IS_V_ROLECODE,
            @RequestParam(value = "IS_V_SYSTYPE") String IS_V_SYSTYPE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_HOME_MENU") String V_V_HOME_MENU,
            @RequestParam(value = "V_V_USERID") String V_V_USERID)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> deptList = (List<Map<String, Object>>) (kxyService.PRO_BASE_MENU_FAVORITE(IS_V_ROLECODE, IS_V_SYSTYPE, V_V_DEPTCODE, V_V_HOME_MENU, V_V_USERID).get("list"));
        List<Map<String, Object>> children = new ArrayList<Map<String, Object>>();
        Map<String, Object> dept;
        if (deptList != null) {
            for (int i = 0; i < deptList.size(); i++) {
                dept = deptList.get(i);
                if ("-1".equals(dept.get("V_MENUCODE_UP"))) {
                    children.add(dept);
                    fillChildDept(dept, deptList);
                }
            }
        }
        result.put("deptList", deptList);
        result.put("children", children);
        return result;
    }

    private void fillChildDept(Map<String, Object> dept, List<Map<String, Object>> deptList) {
        List<Map<String, Object>> children = new ArrayList<Map<String, Object>>();

        Map<String, Object> childDept;
        for (int i = 0; i < deptList.size(); i++) {
            childDept = deptList.get(i);
            if (dept.get("V_MENUCODE").equals(childDept.get("V_MENUCODE_UP"))) {
                children.add(childDept);
                fillChildDept(childDept, deptList);
            }
        }
        dept.put("children", children);
    }

    @RequestMapping(value = "/userInfor", method = RequestMethod.POST)
    @ResponseBody
    public HashMap userInfor(@RequestParam(value = "A_USERCODE") String A_USERCODE,
                             @RequestParam(value = "A_WORK_CENTER") String A_WORK_CENTER) throws Exception {
        HashMap result = kxyService.userInfor(A_USERCODE, A_WORK_CENTER);
        return result;
    }

    @RequestMapping(value = "/selWorkCenter", method = RequestMethod.POST)
    @ResponseBody
    public HashMap selWorkCenter(@RequestParam(value = "A_USERID") String A_USERID) throws Exception {
        HashMap result = kxyService.selWorkCenter(A_USERID);
        return result;
    }

    @RequestMapping(value = "/insertSysPorperty", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> insertSysPorperty(@RequestParam(value = "V_V_PORP_NAME") String V_V_PORP_NAME, @RequestParam(value = "V_V_PORP_VALUE") String V_V_PORP_VALUE, @RequestParam(value = "V_V_PLANT") String V_V_PLANT, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = kxyService.insertSysPorperty(V_V_PORP_NAME, V_V_PORP_VALUE, V_V_PLANT);
        return data;
    }

}