package org.building.pm.controller;

import org.building.pm.service.TreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2017/1/20.
 */

@Controller
@RequestMapping("/app/pm/tree")
public class TreeController {
    @Autowired
    private TreeService treeService;

    @RequestMapping(value = "/MenuTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> MenuTree(@RequestParam(value = "RoleCode") String RoleCode,
                              @RequestParam(value = "DEPTCODE") String DEPTCODE)
            throws SQLException {
        List<Map> result = treeService.MenuTree(RoleCode,DEPTCODE);
        return result;
    }

    @RequestMapping(value = "/NewMenuTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> NewMenuTree(@RequestParam(value = "RoleCode") String RoleCode,
                              @RequestParam(value = "DEPTCODE") String DEPTCODE,
                              @RequestParam(value = "MENUTYPE") String MENUTYPE)
            throws SQLException {
        List<Map> result = treeService.NewMenuTree(RoleCode, DEPTCODE,MENUTYPE);
        return result;
    }

        @RequestMapping(value = "/DeptTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> DeptTree(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                              @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                              @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                              @RequestParam(value = "V_V_TYPE") String V_V_TYPE)
            throws SQLException {
        List<Map> result = treeService.DeptTree(V_V_PERSONCODE,V_V_DEPTCODENEXT,V_V_DEPTCODE,V_V_TYPE);
        return result;
    }

    @RequestMapping(value = "/ModelTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> ModelTree(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                               @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
                               @RequestParam(value = "V_V_ID") String V_V_ID,
                               @RequestParam(value = "V_V_TEXT") String V_V_TEXT,
                               @RequestParam(value = "V_V_PARENTID") String V_V_PARENTID,
                               @RequestParam(value = "V_V_LEAF") String V_V_LEAF,
                               @RequestParam(value = "V_V_CHECKED") String V_V_CHECKED,
                               @RequestParam(value = "V_V_DEPTVAL") String V_V_DEPTVAL,
                               @RequestParam(value = "V_V_CODEVAL") String V_V_CODEVAL,
                               @RequestParam(value = "V_V_PRONAME") String V_V_PRONAME)
            throws SQLException {
        List<Map> result = treeService.ModelTree(V_V_DEPTCODE,V_V_DEPTNAME,V_V_ID,V_V_TEXT,V_V_PARENTID,V_V_LEAF,
                V_V_CHECKED,V_V_DEPTVAL,V_V_CODEVAL,V_V_PRONAME);
        return result;
    }

    @RequestMapping(value = "/AllMenuTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> AllMenuTree(@RequestParam(value = "RoleCode") String RoleCode,
                                 @RequestParam(value = "DEPTCODE") String DEPTCODE)
            throws SQLException {
        List<Map> result = treeService.AllMenuTree(RoleCode,DEPTCODE);
        return result;
    }

    @RequestMapping(value = "/RoleMenuTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> RoleMenuTree(@RequestParam(value = "RoleCode") String RoleCode,
                                  @RequestParam(value = "DEPTCODE") String DEPTCODE)
            throws SQLException {
        List<Map> result = treeService.RoleMenuTree(RoleCode,DEPTCODE);
        return result;
    }

    @RequestMapping(value = "/EquTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> EquTree(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                             @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                             @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                             @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                             @RequestParam(value = "V_V_TYPE") String V_V_TYPE
    )
            throws SQLException {
        List<Map> result = treeService.EquTree(V_V_PERSONCODE,V_V_DEPTCODE,V_V_DEPTNEXTCODE,V_V_EQUTYPECODE,V_V_EQUCODE,V_V_TYPE);
        return result;
    }

    @RequestMapping(value = "/PRO_GET_DEPTEQUTYPE_PER", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_GET_DEPTEQUTYPE_PER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                       @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT) throws Exception {
        Map map = treeService.PRO_GET_DEPTEQUTYPE_PER(V_V_PERSONCODE,V_V_DEPTCODENEXT);
        return map;
    }

    @RequestMapping(value = "/PRO_PM_07_DEPTEQU_PER_DROP", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_VIEW(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE) throws Exception {
        Map map = treeService.PRO_PM_07_DEPTEQU_PER_DROP(V_V_PERSONCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE);
        return map;
    }

    @RequestMapping(value = "/No41020101Tree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> No41020101Tree(@RequestParam(value = "ORDER_ID") String ORDER_ID,
                                    @RequestParam(value = "WORK_ID") String WORK_ID,
                                    @RequestParam(value = "DEPARTCODE") String DEPARTCODE)
            throws SQLException {
        List<Map> result = treeService.No41020101Tree(ORDER_ID,WORK_ID,DEPARTCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_NEW_MENU_SEL", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_BASE_NEW_MENU_SEL(
                                 @RequestParam(value = "IS_V_ROLECODE") String IS_V_ROLECODE,
                                 @RequestParam(value = "IS_V_SYSTYPE") String IS_V_SYSTYPE,
                                 @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                 @RequestParam(value = "V_V_HOME_MENU") String V_V_HOME_MENU)
            throws SQLException {
        List<Map> result = treeService.PRO_BASE_NEW_MENU_SEL(IS_V_ROLECODE, IS_V_SYSTYPE,V_V_DEPTCODE, V_V_HOME_MENU);
        return result;
    }

    @RequestMapping(value = "/PRO_GET_DEPTEQUTYPE_PER_tree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_GET_DEPTEQUTYPE_PER_tree(
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT)
            throws SQLException {
        List<Map> result = treeService.PRO_GET_DEPTEQUTYPE_PER_tree(V_V_PERSONCODE, V_V_DEPTCODENEXT);
        return result;
    }

    @RequestMapping(value = "/QUERY_DEPT_EQUTYPE_PRELOADWARE_tree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> QUERY_DEPT_EQUTYPE_PRELOADWARE_tree(
            @RequestParam(value = "X_DEPTCODE") String X_DEPTCODE,
            @RequestParam(value = "X_EQUTYPECODE") String X_EQUTYPECODE)
            throws SQLException {
        List<Map> result = treeService.QUERY_DEPT_EQUTYPE_PRELOADWARE_tree(X_DEPTCODE, X_EQUTYPECODE);
        return result;
    }

    /*检修单位树*/
    @RequestMapping(value = "/PRO_PM_REPAIRDEPT_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_PM_REPAIRDEPT_VIEW(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE)
            throws SQLException {
        List<Map> result = treeService.PRO_PM_REPAIRDEPT_VIEW(V_V_DEPTCODE);
        return result;
    }

    /*检修作业区角色*/
    @RequestMapping(value = "/PRO_BASE_PERSONROLE_NEW_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_BASE_PERSONROLE_NEW_VIEW(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE)
            throws SQLException {
        List<Map> result = treeService.PRO_BASE_PERSONROLE_NEW_VIEW(V_V_DEPTCODE);
        return result;
    }

    /*检修作业区审批人员*/

    @RequestMapping(value = "/PM_WORKREPAIR_PERBYROLE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PM_WORKREPAIR_PERBYROLE_SEL(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE)
            throws SQLException {
        List<Map> result = treeService.PM_WORKREPAIR_PERBYROLE_SEL(V_V_DEPTCODE,V_V_ROLECODE);
        return result;
    }
}
