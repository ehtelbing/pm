package org.building.pm.webcontroller;

import net.sf.json.JSON;
import net.sf.json.JSONArray;
import org.building.pm.webpublic.*;
import org.building.pm.webservice.MobileService;
import org.codehaus.xfire.client.Client;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by zjh on 2017/2/27.
 */

@Controller
@RequestMapping("/app/pm/mobile")
public class MobileController {
    @Autowired
    private MobileService mobileService;

    /*
   * mes移动端--登录
   * */
    @RequestMapping(value = "mobile_login", method = RequestMethod.GET)
    @ResponseBody
    public void login(@RequestParam(value = "UserName") String UserName,
                      @RequestParam(value = "PassWord") String PassWord,
                      HttpServletRequest request,
                      HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {
        List<PersonClass> item = new ArrayList<PersonClass>();

        Map<String, Object> result = mobileService.mobile_login(UserName, PassWord);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                PersonClass per = new PersonClass();
                per.setI_PERSONID(map.get("I_PERSONID") == null ? "" : map.get("I_PERSONID").toString());
                per.setV_CLASS_CODE(map.get("V_CLASS_CODE") == null ? "" : map.get("V_CLASS_CODE").toString());
                per.setV_DEPTCODE(map.get("V_DEPTCODE") == null ? "" : map.get("V_DEPTCODE").toString());
                per.setV_DEPTNAME(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());
                per.setV_LOGINNAME(map.get("V_LOGINNAME") == null ? "" : map.get("V_LOGINNAME").toString());
                per.setV_ORGCODE(map.get("V_ORGCODE") == null ? "" : map.get("V_ORGCODE").toString());
                per.setV_ORGNAME(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());
                per.setV_POSTCODE(map.get("V_POSTCODE") == null ? "" : map.get("V_POSTCODE").toString());
                per.setV_POSTNAME(map.get("V_POSTNAME") == null ? "" : map.get("V_POSTNAME").toString());
                per.setV_ROLECODE(map.get("V_ROLECODE") == null ? "" : map.get("V_ROLECODE").toString());
                per.setV_ROLENAME(map.get("V_ROLENAME") == null ? "" : map.get("V_ROLENAME").toString());
                per.setV_WORKCSS(map.get("V_WORKCSS") == null ? "" : map.get("V_WORKCSS").toString());
                item.add(per);
            }
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }


    /*
    * mes移动端菜单
    * */
    @RequestMapping(value = "mobile_menu", method = RequestMethod.GET)
    @ResponseBody
    public void login(@RequestParam(value = "IS_V_ROLECODE") String IS_V_ROLECODE,
                      @RequestParam(value = "IS_V_SYSTYPE") String IS_V_SYSTYPE,
                      @RequestParam(value = "IS_V_MENUCODE_UP") String IS_V_MENUCODE_UP,
                      @RequestParam(value = "DEPTCODE") String DEPTCODE,
                      HttpServletRequest request,
                      HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {
        List<MenuClass> item = new ArrayList<>();

        Map<String, Object> result = mobileService.mobile_menu(IS_V_ROLECODE, IS_V_SYSTYPE, IS_V_MENUCODE_UP, DEPTCODE);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                MenuClass menu = new MenuClass();
                menu.setI_MENUID(map.get("I_MENUID") == null ? "" : map.get("I_MENUID").toString());
                menu.setV_MENUCODE(map.get("V_MENUCODE") == null ? "" : map.get("V_MENUCODE").toString());
                menu.setV_MENUNAME(map.get("V_MENUNAME") == null ? "" : map.get("V_MENUNAME").toString());
                menu.setV_MENUCODE_UP(map.get("V_MENUCODE_UP") == null ? "" : map.get("V_MENUCODE_UP").toString());
                menu.setV_URL(map.get("V_URL") == null ? "" : map.get("V_URL").toString());
                menu.setV_ICOURL(map.get("V_ICOURL") == null ? "" : map.get("V_ICOURL").toString());
                menu.setV_SYSTYPE(map.get("V_SYSTYPE") == null ? "" : map.get("V_SYSTYPE").toString());
                menu.setI_ORDERID(map.get("I_ORDERID") == null ? "" : map.get("I_ORDERID").toString());
                menu.setV_ROLECODE(map.get("V_ROLECODE") == null ? "" : map.get("V_ROLECODE").toString());
                menu.setV_ROLENAME(map.get("V_ROLENAME") == null ? "" : map.get("V_ROLENAME").toString());
                menu.setV_DEPTCODE(map.get("V_DEPTCODE") == null ? "" : map.get("V_DEPTCODE").toString());
                item.add(menu);
            }
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }


    /*工单状态查询*/
    @RequestMapping(value = "mobile_gsType", method = RequestMethod.GET)
    @ResponseBody
    public void mobile_EquSel(@RequestParam(value = "PlantCode") String PlantCode,
                              @RequestParam(value = "DeptCode") String DeptCode,
                              HttpServletRequest request,
                              HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<EquInfClass> item = new ArrayList<EquInfClass>();

        Map<String, Object> result = mobileService.mobile_EquSel(PlantCode, DeptCode);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                EquInfClass equInf = new EquInfClass();

                equInf.setPlantCode(map.get("V_PLANT_CODE") == null ? "" : map.get("V_PLANT_CODE").toString());
                equInf.setPlantName(map.get("V_PLANT_NAME") == null ? "" : map.get("V_PLANT_NAME").toString());
                equInf.setDeptCode(map.get("V_DEPT_CODE") == null ? "" : map.get("V_DEPT_CODE").toString());
                equInf.setDeptName(map.get("V_DEPT_NAME") == null ? "" : map.get("V_DEPT_NAME").toString());
                equInf.setEquCode(map.get("V_EQU_CODE") == null ? "" : map.get("V_EQU_CODE").toString());
                equInf.setEquName(map.get("V_EQU_NAME") == null ? "" : map.get("V_EQU_NAME").toString());
                equInf.setEquType(map.get("V_EQU_TYPE") == null ? "" : map.get("V_EQU_TYPE").toString());

                item.add(equInf);
            }
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*厂矿/作业区查询*/
    @RequestMapping(value = "PRO_BASE_DEPT_VIEW_ROLE", method = RequestMethod.GET)
    @ResponseBody
    public void mobile_EquSel(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                              @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                              @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                              @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                              HttpServletRequest request,
                              HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<SelectClass> item = new ArrayList<SelectClass>();

        Map<String, Object> result = mobileService.PRO_BASE_DEPT_VIEW_ROLE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_DEPTTYPE);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                SelectClass equInf = new SelectClass();

                equInf.setCode(map.get("V_DEPTCODE") == null ? "" : map.get("V_DEPTCODE").toString());
                equInf.setName(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());
                item.add(equInf);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*设备类型查询*/
    @RequestMapping(value = "PRO_GET_DEPTEQUTYPE_PER", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_GET_DEPTEQUTYPE_PER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                        @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                        HttpServletRequest request,
                                        HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<SelectClass> item = new ArrayList<SelectClass>();

        Map<String, Object> result = mobileService.PRO_GET_DEPTEQUTYPE_PER(V_V_PERSONCODE, V_V_DEPTCODENEXT);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                SelectClass equInf = new SelectClass();
                equInf.setCode(map.get("V_EQUTYPECODE") == null ? "" : map.get("V_EQUTYPECODE").toString());
                equInf.setName(map.get("V_EQUTYPENAME") == null ? "" : map.get("V_EQUTYPENAME").toString());
                item.add(equInf);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*设备名称查询*/
    @RequestMapping(value = "PRO_GET_DEPTEQU_PER", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_GET_DEPTEQU_PER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                    @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                    @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<SelectClass> item = new ArrayList<SelectClass>();

        Map<String, Object> result = mobileService.PRO_GET_DEPTEQU_PER(V_V_PERSONCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                SelectClass equInf = new SelectClass();
                equInf.setCode(map.get("V_EQUCODE") == null ? "" : map.get("V_EQUCODE").toString());
                equInf.setName(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());
                item.add(equInf);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*子设备名称查询*/
    @RequestMapping(value = "PRO_SAP_EQU_VIEW", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_SAP_EQU_VIEW(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                 @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                 @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                 @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                 @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                 HttpServletRequest request,
                                 HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<SelectClass> item = new ArrayList<SelectClass>();

        Map<String, Object> result = mobileService.PRO_SAP_EQU_VIEW(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUCODE);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                SelectClass equInf = new SelectClass();
                equInf.setCode(map.get("V_EQUCODE") == null ? "" : map.get("V_EQUCODE").toString());
                equInf.setName(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());
                item.add(equInf);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }


    /*故障类型查询*/
    @RequestMapping(value = "PM_14_FAULT_TYPE_ITEM_SEL", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_TYPE_ITEM_SEL(
            HttpServletRequest request,
            HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<SelectClass> item = new ArrayList<SelectClass>();

        Map<String, Object> result = mobileService.PM_14_FAULT_TYPE_ITEM_SEL();

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                SelectClass sel = new SelectClass();
                sel.setCode(map.get("V_TYPECODE") == null ? "" : map.get("V_TYPECODE").toString());
                sel.setName(map.get("V_TYPENAME") == null ? "" : map.get("V_TYPENAME").toString());
                item.add(sel);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*班组查询*/
    @RequestMapping(value = "PRO_CLASS_M_QUERY", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_CLASS_M_QUERY(@RequestParam(value = "IN_DEPARTCODE") String IN_DEPARTCODE,
                                  @RequestParam(value = "IN_CLASSNAME") String IN_CLASSNAME,
                                  HttpServletRequest request,
                                  HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<PersonClass> item = new ArrayList<PersonClass>();

        Map<String, Object> result = mobileService.PRO_CLASS_M_QUERY(IN_DEPARTCODE, IN_CLASSNAME);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                PersonClass personClass = new PersonClass();
                personClass.setV_CLASS_CODE(map.get("V_CLASS_CODE") == null ? "" : map.get("V_CLASS_CODE").toString());
                personClass.setV_CLASS_NAME(map.get("V_CLASS_NAME") == null ? "" : map.get("V_CLASS_NAME").toString());
                personClass.setV_DEPTNAME(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());
                personClass.setV_WORKCSS(map.get("V_SAP_WORKNAME") == null ? "" : map.get("V_SAP_WORKNAME").toString());
                item.add(personClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*班组人员查询*/
    @RequestMapping(value = "PRO_CLASS_M_QUERY_P", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_CLASS_M_QUERY_P(@RequestParam(value = "IN_CLASSCODE") String IN_CLASSCODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<PersonClass> item = new ArrayList<PersonClass>();

        Map<String, Object> result = mobileService.PRO_CLASS_M_QUERY_P(IN_CLASSCODE);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                PersonClass personClass = new PersonClass();
                personClass.setV_POSTCODE(map.get("V_PERSONCODE") == null ? "" : map.get("V_PERSONCODE").toString());
                personClass.setV_POSTNAME(map.get("V_PERSONNAME") == null ? "" : map.get("V_PERSONNAME").toString());
                personClass.setV_CLASS_NAME(map.get("V_CLASS_NAME") == null ? "" : map.get("V_CLASS_NAME").toString());
                personClass.setV_ROLECODE(map.get("V_ROLECODE") == null ? "" : map.get("V_ROLECODE").toString());
                item.add(personClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*班组人员保存*/
    @RequestMapping(value = "PM_14_FAULT_PER_CLASS_SET", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_PER_CLASS_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                          @RequestParam(value = "V_V_CLASSCODE") String V_V_CLASSCODE,
                                          @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                          HttpServletRequest request,
                                          HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<PersonClass> item = new ArrayList<PersonClass>();

        Map<String, Object> result = mobileService.PM_14_FAULT_PER_CLASS_SET(V_V_GUID, V_V_CLASSCODE, V_V_PERCODE);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                PersonClass personClass = new PersonClass();
                personClass.setV_RESULT(map.get("V_INFO") == null ? "" : map.get("V_INFO").toString());
                item.add(personClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*班组人员发送*/
    @RequestMapping(value = "PM_14_FAULT_ITEM_DATA_SEND", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_ITEM_DATA_SEND(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                           @RequestParam(value = "V_V_IP") String V_V_IP,
                                           @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                           HttpServletRequest request,
                                           HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<PersonClass> item = new ArrayList<PersonClass>();

        Map<String, Object> result = mobileService.PM_14_FAULT_ITEM_DATA_SEND(V_V_PERCODE, V_V_IP, V_V_GUID);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                PersonClass personClass = new PersonClass();
                personClass.setV_RESULT(map.get("V_INFO") == null ? "" : map.get("V_INFO").toString());
                item.add(personClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*机具查询*/
    @RequestMapping(value = "PRO_PM_19_CARDE_SEL", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_PM_19_CARDE_SEL(@RequestParam(value = "PRO_PM_19_CARDE_SEL") String IN_CLASSCODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<JJClass> item = new ArrayList<JJClass>();

        Map<String, Object> result = mobileService.PRO_PM_19_CARDE_SEL(IN_CLASSCODE);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                JJClass jjClass = new JJClass();
                jjClass.setV_CARCODE(map.get("V_CARCODE") == null ? "" : map.get("V_CARCODE").toString());
                jjClass.setV_CARNAME(map.get("V_CARNAME") == null ? "" : map.get("V_CARNAME").toString());
                jjClass.setV_CARTYPE(map.get("V_CARTYPE") == null ? "" : map.get("V_CARTYPE").toString());
                jjClass.setV_DE(map.get("V_TIME") == null ? "" : map.get("V_TIME").toString());
                jjClass.setV_TIME(map.get("V_DE") == null ? "" : map.get("V_DE").toString());
                item.add(jjClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*机具选择*/
    @RequestMapping(value = "PM_14_FAULT_JJ_SET", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_JJ_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                   @RequestParam(value = "V_V_CARCODE") String V_V_CARCODE,
                                   HttpServletRequest request,
                                   HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<PersonClass> item = new ArrayList<PersonClass>();

        Map<String, Object> result = mobileService.PM_14_FAULT_JJ_SET(V_V_GUID, V_V_CARCODE);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                PersonClass personClass = new PersonClass();
                personClass.setV_RESULT(map.get("V_INFO") == null ? "" : map.get("V_INFO").toString());
                item.add(personClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*物料查询*/
    @RequestMapping(value = "PM_14_FAULT_SPARE_ITEM_SEL", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_SPARE_ITEM_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                           @RequestParam(value = "V_V_SPAREPART_CODE") String V_V_SPAREPART_CODE,
                                           HttpServletRequest request,
                                           HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<MaterialClass> item = new ArrayList<MaterialClass>();

        Map<String, Object> result = mobileService.PM_14_FAULT_SPARE_ITEM_SEL(V_V_GUID, V_V_SPAREPART_CODE);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                MaterialClass materialClass = new MaterialClass();
                materialClass.setV_GUID(map.get("V_GUID") == null ? "" : map.get("V_GUID").toString());
                materialClass.setV_SPAREPART_CODE(map.get("V_SPAREPART_CODE") == null ? "" : map.get("V_SPAREPART_CODE").toString());
                materialClass.setV_SPAREPART_NAME(map.get("V_SPAREPART_NAME") == null ? "" : map.get("V_SPAREPART_NAME").toString());
                materialClass.setV_TYPE(map.get("V_TYPE") == null ? "" : map.get("V_TYPE").toString());
                materialClass.setV_UNIT(map.get("V_UNIT") == null ? "" : map.get("V_UNIT").toString());
                materialClass.setV_PRICE(map.get("V_PRICE") == null ? "" : map.get("V_PRICE").toString());
                materialClass.setV_NUMBER(map.get("V_NUMBER") == null ? "" : map.get("V_NUMBER").toString());
                item.add(materialClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*物料删除*/
    @RequestMapping(value = "PM_14_FAULT_SPARE_ITEM_DEL", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_SPARE_ITEM_DEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                           @RequestParam(value = "V_V_SPAREPART_CODE") String V_V_SPAREPART_CODE,
                                           HttpServletRequest request,
                                           HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<PersonClass> item = new ArrayList<PersonClass>();

        Map<String, Object> result = mobileService.PM_14_FAULT_SPARE_ITEM_DEL(V_V_GUID, V_V_SPAREPART_CODE);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                PersonClass personClass = new PersonClass();
                personClass.setV_RESULT(map.get("V_INFO") == null ? "" : map.get("V_INFO").toString());
                item.add(personClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*物料保存*/
    @RequestMapping(value = "PM_14_FAULT_SPARE_ITEM_SET", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_SPARE_ITEM_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                           @RequestParam(value = "V_V_SPAREPART_CODE") String V_V_SPAREPART_CODE,
                                           @RequestParam(value = "V_V_SPAREPART_NAME") String V_V_SPAREPART_NAME,
                                           @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
                                           @RequestParam(value = "V_V_UNIT") String V_V_UNIT,
                                           @RequestParam(value = "V_V_PRICE") String V_V_PRICE,
                                           @RequestParam(value = "V_V_NUMBER") String V_V_NUMBER,
                                           HttpServletRequest request,
                                           HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<PersonClass> item = new ArrayList<PersonClass>();

        Map<String, Object> result = mobileService.PM_14_FAULT_SPARE_ITEM_SET(V_V_GUID, V_V_SPAREPART_CODE, V_V_SPAREPART_NAME,
                V_V_TYPE, V_V_UNIT, V_V_PRICE, V_V_NUMBER);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                PersonClass personClass = new PersonClass();
                personClass.setV_RESULT(map.get("V_INFO") == null ? "" : map.get("V_INFO").toString());
                item.add(personClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*
    * 故障字典查询
    * */
    @RequestMapping(value = "PM_14_FAULT_ITEM_SEL", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_ITEM_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                     @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                     @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                     @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                     @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
                                     @RequestParam(value = "V_V_FAULT_TYPE") String V_V_FAULT_TYPE,
                                     @RequestParam(value = "V_V_FAULT_YY") String V_V_FAULT_YY,
                                     HttpServletRequest request,
                                     HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<FalutClass> item = new ArrayList<FalutClass>();

        Map<String, Object> result = mobileService.PM_14_FAULT_ITEM_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE,
                V_V_EQUCODE, V_V_EQUCHILD_CODE, V_V_FAULT_TYPE, V_V_FAULT_YY);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                FalutClass falutClass = new FalutClass();
                falutClass.setV_ORGCODE(map.get("V_ORGCODE") == null ? "" : map.get("V_ORGCODE").toString());
                falutClass.setV_ORGNAME(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());
                falutClass.setV_DEPTCODE(map.get("V_DEPTCODE") == null ? "" : map.get("V_DEPTCODE").toString());
                falutClass.setV_DEPTNAME(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());
                falutClass.setV_EQUTYPECODE(map.get("V_EQUTYPECODE") == null ? "" : map.get("V_EQUTYPECODE").toString());
                falutClass.setV_EQUTYPENAME(map.get("V_EQUTYPENAME") == null ? "" : map.get("V_EQUTYPENAME").toString());
                falutClass.setV_EQUCODE(map.get("V_EQUCODE") == null ? "" : map.get("V_EQUCODE").toString());
                falutClass.setV_EQUNAME(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());
                falutClass.setV_EQUCHILD_CODE(map.get("V_EQUCHILD_CODE") == null ? "" : map.get("V_EQUCHILD_CODE").toString());
                falutClass.setV_EQUCHILD_NAME(map.get("V_EQUCHILD_NAME") == null ? "" : map.get("V_EQUCHILD_NAME").toString());
                falutClass.setV_TYPECODE(map.get("V_TYPECODE") == null ? "" : map.get("V_TYPECODE").toString());
                falutClass.setV_TYPENAME(map.get("V_TYPENAME") == null ? "" : map.get("V_TYPENAME").toString());
                falutClass.setV_FAULT_YY(map.get("V_FAULT_YY") == null ? "" : map.get("V_FAULT_YY").toString());
                falutClass.setV_BZ(map.get("V_BZ") == null ? "" : map.get("V_BZ").toString());
                falutClass.setV_GUID(map.get("V_GUID") == null ? "" : map.get("V_GUID").toString());
                item.add(falutClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*
    * 故障字典查詢唯一数据
    * */
    @RequestMapping(value = "PM_14_FAULT_ITEM_SELBYGUID", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_ITEM_SELBYGUID(@RequestParam(value = "V_V_GUID") String V_V_ORGCODE,
                                           HttpServletRequest request,
                                           HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {
        UUID uuid = UUID.randomUUID();
        List<FalutClass> item = new ArrayList<FalutClass>();

        Map<String, Object> result = mobileService.PM_14_FAULT_ITEM_SELBYGUID(V_V_ORGCODE);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                FalutClass falutClass = new FalutClass();
                falutClass.setV_ORGCODE(map.get("V_ORGCODE") == null ? "" : map.get("V_ORGCODE").toString());
                falutClass.setV_ORGNAME(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());
                falutClass.setV_DEPTCODE(map.get("V_DEPTCODE") == null ? "" : map.get("V_DEPTCODE").toString());
                falutClass.setV_DEPTNAME(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());
                falutClass.setV_EQUTYPECODE(map.get("V_EQUTYPECODE") == null ? "" : map.get("V_EQUTYPECODE").toString());
                falutClass.setV_EQUTYPENAME(map.get("V_EQUTYPENAME") == null ? "" : map.get("V_EQUTYPENAME").toString());
                falutClass.setV_EQUCODE(map.get("V_EQUCODE") == null ? "" : map.get("V_EQUCODE").toString());
                falutClass.setV_EQUNAME(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());
                falutClass.setV_EQUCHILD_CODE(map.get("V_EQUCHILD_CODE") == null ? "" : map.get("V_EQUCHILD_CODE").toString());
                falutClass.setV_EQUCHILD_NAME(map.get("V_EQUCHILD_NAME") == null ? "" : map.get("V_EQUCHILD_NAME").toString());
                falutClass.setV_TYPECODE(map.get("V_TYPECODE") == null ? "" : map.get("V_TYPECODE").toString());
                falutClass.setV_TYPENAME(map.get("V_TYPENAME") == null ? "" : map.get("V_TYPENAME").toString());
                falutClass.setV_FAULT_YY(map.get("V_FAULT_YY") == null ? "" : map.get("V_FAULT_YY").toString());
                falutClass.setV_BZ(map.get("V_BZ") == null ? "" : map.get("V_BZ").toString());
                falutClass.setV_FAULT_GUID(map.get("V_FAULT_GUID") == null ? "" : map.get("V_FAULT_GUID").toString());
                falutClass.setV_GUID(uuid.toString());
                item.add(falutClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*
  * 故障数据查询
  * */
    @RequestMapping(value = "PM_14_FAULT_ITEM_DATA_GET", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_ITEM_DATA_GET(@RequestParam(value = "V_V_GUID") String V_V_ORGCODE,
                                          HttpServletRequest request,
                                          HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<FalutClass> item = new ArrayList<FalutClass>();

        Map<String, Object> result = mobileService.PM_14_FAULT_ITEM_DATA_GET(V_V_ORGCODE);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                FalutClass falutClass = new FalutClass();
                falutClass.setV_ORGCODE(map.get("V_ORGCODE") == null ? "" : map.get("V_ORGCODE").toString());
                falutClass.setV_ORGNAME(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());
                falutClass.setV_DEPTCODE(map.get("V_DEPTCODE") == null ? "" : map.get("V_DEPTCODE").toString());
                falutClass.setV_DEPTNAME(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());
                falutClass.setV_EQUTYPECODE(map.get("V_EQUTYPECODE") == null ? "" : map.get("V_EQUTYPECODE").toString());
                falutClass.setV_EQUTYPENAME(map.get("V_EQUTYPENAME") == null ? "" : map.get("V_EQUTYPENAME").toString());
                falutClass.setV_EQUCODE(map.get("V_EQUCODE") == null ? "" : map.get("V_EQUCODE").toString());
                falutClass.setV_EQUNAME(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());
                falutClass.setV_EQUCHILD_CODE(map.get("V_EQUCHILD_CODE") == null ? "" : map.get("V_EQUCHILD_CODE").toString());
                falutClass.setV_EQUCHILD_NAME(map.get("V_EQUCHILD_NAME") == null ? "" : map.get("V_EQUCHILD_NAME").toString());
                falutClass.setV_TYPECODE(map.get("V_TYPECODE") == null ? "" : map.get("V_TYPECODE").toString());
                falutClass.setV_TYPENAME(map.get("V_TYPENAME") == null ? "" : map.get("V_TYPENAME").toString());
                falutClass.setV_FAULT_YY(map.get("V_FAULT_YY") == null ? "" : map.get("V_FAULT_YY").toString());
                falutClass.setV_FAULT_XX(map.get("V_FAULT_XX") == null ? "" : map.get("V_FAULT_XX").toString());
                falutClass.setV_FAULT_LEVEL(map.get("V_FAULT_LEVEL") == null ? "" : map.get("V_FAULT_LEVEL").toString());
                falutClass.setV_JJBF(map.get("V_JJBF") == null ? "" : map.get("V_JJBF").toString());
                falutClass.setV_JJ(map.get("V_JJ") == null ? "" : map.get("V_JJ").toString());
                falutClass.setV_WL(map.get("V_WL") == null ? "" : map.get("V_WL").toString());
                falutClass.setV_PART(map.get("V_PART") == null ? "" : map.get("V_PART").toString());
                falutClass.setV_MATERIAL(map.get("V_MATERIAL") == null ? "" : map.get("V_MATERIAL").toString());
                falutClass.setV_TIME(map.get("V_TIME") == null ? "" : map.get("V_TIME").toString());
                falutClass.setV_FILE_GUID(map.get("V_FILE_GUID") == null ? "" : map.get("V_FILE_GUID").toString());
                falutClass.setV_GUID(map.get("V_GUID") == null ? "" : map.get("V_GUID").toString());
                falutClass.setV_FZR(map.get("V_FZR") == null ? "" : map.get("V_FZR").toString());
                falutClass.setV_STATE(map.get("V_STATE") == null ? "" : map.get("V_STATE").toString());
                falutClass.setV_FEEDBACK(map.get("V_FEEDBACK") == null ? "" : map.get("V_FEEDBACK").toString());
                falutClass.setV_BZ(map.get("V_BZ") == null ? "" : map.get("V_BZ").toString());
                falutClass.setV_FINDTIME(map.get("V_FINDTIME") == null ? "" : map.get("V_FINDTIME").toString());
                falutClass.setV_ORDERGUID(map.get("V_ORDERGUID") == null ? "" : map.get("V_ORDERGUID").toString());
                item.add(falutClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*设备故障查询*/
    @RequestMapping(value = "PM_14_FAULT_ITEM_DATA_SEL", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_ITEM_DATA_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                          @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                          @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                          @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
                                          @RequestParam(value = "V_V_FAULT_TYPE") String V_V_FAULT_TYPE,
                                          @RequestParam(value = "V_V_FAULT_YY") String V_V_FAULT_YY,
                                          @RequestParam(value = "V_V_FINDTIME_B") String V_V_FINDTIME_B,
                                          @RequestParam(value = "V_V_FINDTIME_E") String V_V_FINDTIME_E,
                                          HttpServletRequest request,
                                          HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<FalutClass> item = new ArrayList<FalutClass>();

        Map<String, Object> result = mobileService.PM_14_FAULT_ITEM_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE,
                V_V_EQUCODE, V_V_EQUCHILD_CODE, V_V_FAULT_TYPE, V_V_FAULT_YY, V_V_FINDTIME_B, V_V_FINDTIME_E);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                FalutClass falutClass = new FalutClass();
                falutClass.setV_ORGCODE(map.get("V_ORGCODE") == null ? "" : map.get("V_ORGCODE").toString());
                falutClass.setV_ORGNAME(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());
                falutClass.setV_DEPTCODE(map.get("V_DEPTCODE") == null ? "" : map.get("V_DEPTCODE").toString());
                falutClass.setV_DEPTNAME(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());
                falutClass.setV_EQUTYPECODE(map.get("V_EQUTYPECODE") == null ? "" : map.get("V_EQUTYPECODE").toString());
                falutClass.setV_EQUTYPENAME(map.get("V_EQUTYPENAME") == null ? "" : map.get("V_EQUTYPENAME").toString());
                falutClass.setV_EQUCODE(map.get("V_EQUCODE") == null ? "" : map.get("V_EQUCODE").toString());
                falutClass.setV_EQUNAME(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());
                falutClass.setV_EQUCHILD_CODE(map.get("V_EQUCHILD_CODE") == null ? "" : map.get("V_EQUCHILD_CODE").toString());
                falutClass.setV_FAULT_GUID(map.get("V_FAULT_GUID") == null ? "" : map.get("V_FAULT_GUID").toString());
                falutClass.setV_EQUCHILD_NAME(map.get("V_EQUCHILD_NAME") == null ? "" : map.get("V_EQUCHILD_NAME").toString());
                falutClass.setV_TYPECODE(map.get("V_TYPECODE") == null ? "" : map.get("V_TYPECODE").toString());
                falutClass.setV_TYPENAME(map.get("V_TYPENAME") == null ? "" : map.get("V_TYPENAME").toString());
                falutClass.setV_FAULT_YY(map.get("V_FAULT_YY") == null ? "" : map.get("V_FAULT_YY").toString());
                falutClass.setV_FAULT_XX(map.get("V_FAULT_XX") == null ? "" : map.get("V_FAULT_XX").toString());
                falutClass.setV_FAULT_LEVEL(map.get("V_FAULT_LEVEL") == null ? "" : map.get("V_FAULT_LEVEL").toString());
                falutClass.setV_JJBF(map.get("V_JJBF") == null ? "" : map.get("V_JJBF").toString());
                falutClass.setV_PER_CLASS(map.get("V_PER_CLASS") == null ? "" : map.get("V_PER_CLASS").toString());
                falutClass.setV_JJ(map.get("V_JJ") == null ? "" : map.get("V_JJ").toString());
                falutClass.setV_WL(map.get("V_WL") == null ? "" : map.get("V_WL").toString());
                falutClass.setV_PART(map.get("V_PART") == null ? "" : map.get("V_PART").toString());
                falutClass.setV_TIME(map.get("V_TIME") == null ? "" : map.get("V_TIME").toString());
                falutClass.setV_FILE_GUID(map.get("V_FILE_GUID") == null ? "" : map.get("V_FILE_GUID").toString());
                falutClass.setV_GUID(map.get("V_GUID") == null ? "" : map.get("V_GUID").toString());
                item.add(falutClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }


    /*设备故障保存*/
    @RequestMapping(value = "PM_14_FAULT_ITEM_DATA_SET", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_ITEM_DATA_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                          @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                          @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                          @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                          @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
                                          @RequestParam(value = "V_V_FAULT_GUID") String V_V_FAULT_GUID,
                                          @RequestParam(value = "V_V_FAULT_TYPE") String V_V_FAULT_TYPE,
                                          @RequestParam(value = "V_V_FAULT_YY") String V_V_FAULT_YY,
                                          @RequestParam(value = "V_V_FINDTIME") String V_V_FINDTIME,
                                          @RequestParam(value = "V_V_FAULT_XX") String V_V_FAULT_XX,
                                          @RequestParam(value = "V_V_JJBF") String V_V_JJBF,
                                          @RequestParam(value = "V_V_FAULT_LEVEL") String V_V_FAULT_LEVEL,
                                          @RequestParam(value = "V_V_FILE_GUID") String V_V_FILE_GUID,
                                          @RequestParam(value = "V_V_INTIME") String V_V_INTIME,
                                          @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                          @RequestParam(value = "V_V_IP") String V_V_IP,
                                          HttpServletRequest request,
                                          HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<PersonClass> item = new ArrayList<PersonClass>();

        if (V_V_FAULT_YY.equals("null")) {
            V_V_FAULT_YY = "";
        }

        if (V_V_FAULT_XX.equals("null")) {
            V_V_FAULT_YY = "";
        }

        if (V_V_JJBF.equals("null")) {
            V_V_FAULT_YY = "";
        }

        if (V_V_FAULT_LEVEL.equals("null")) {
            V_V_FAULT_YY = "";
        }

        Map<String, Object> result = mobileService.PM_14_FAULT_ITEM_DATA_SET(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_EQUTYPE, V_V_EQUCODE, V_V_EQUCHILD_CODE, V_V_FAULT_GUID, V_V_FAULT_TYPE, V_V_FAULT_YY, V_V_FINDTIME, V_V_FAULT_XX,
                V_V_JJBF, V_V_FAULT_LEVEL, V_V_FILE_GUID, V_V_INTIME, V_V_PERCODE, V_V_IP);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                PersonClass personClass = new PersonClass();
                personClass.setV_RESULT(map.get("V_INFO") == null ? "" : map.get("V_INFO").toString());
                item.add(personClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*设备故障删除*/
    @RequestMapping(value = "PM_14_FAULT_ITEM_DATA_DEL", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_ITEM_DATA_DEL(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                          @RequestParam(value = "V_V_IP") String V_V_IP,
                                          @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                          HttpServletRequest request,
                                          HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<PersonClass> item = new ArrayList<PersonClass>();

        Map<String, Object> result = mobileService.PM_14_FAULT_ITEM_DATA_DEL(V_V_PERCODE, V_V_IP, V_V_GUID);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                PersonClass personClass = new PersonClass();
                personClass.setV_RESULT(map.get("V_INFO") == null ? "" : map.get("V_INFO").toString());
                item.add(personClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*附件查询*/
    @RequestMapping(value = "PRO_BASE_FILE_SEL", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_BASE_FILE_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                  @RequestParam(value = "V_V_FILETYPECODE") String V_V_FILETYPECODE,
                                  HttpServletRequest request,
                                  HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<FileClass> item = new ArrayList<FileClass>();

        Map<String, Object> result = mobileService.PRO_BASE_FILE_SEL(V_V_GUID, V_V_FILETYPECODE);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                FileClass fileClass = new FileClass();
                fileClass.setV_FILENAME(map.get("V_FILENAME") == null ? "" : map.get("V_FILENAME").toString());
                fileClass.setV_FILETYPENAME(map.get("V_FILETYPENAME") == null ? "" : map.get("V_FILETYPENAME").toString());
                fileClass.setV_PLANT(map.get("V_PLANT") == null ? "" : map.get("V_PLANT").toString());
                fileClass.setV_DEPT(map.get("V_DEPT") == null ? "" : map.get("V_DEPT").toString());
                fileClass.setV_TIME(map.get("V_TIME") == null ? "" : map.get("V_TIME").toString());
                fileClass.setV_PERSON(map.get("V_PERSON") == null ? "" : map.get("V_PERSON").toString());
                fileClass.setV_REMARK(map.get("V_REMARK") == null ? "" : map.get("V_REMARK").toString());
                fileClass.setV_FILEGUID(map.get("V_FILEGUID") == null ? "" : map.get("V_FILEGUID").toString());
                item.add(fileClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*附件删除*/
    @RequestMapping(value = "PRO_BASE_FILE_DEL", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_BASE_FILE_DEL(@RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                                  HttpServletRequest request,
                                  HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        List<PersonClass> item = new ArrayList<PersonClass>();

        Map<String, Object> result = mobileService.PRO_BASE_FILE_DEL(V_V_FILEGUID);

        if (result.size() > 0) {
            List list = (List) result.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                PersonClass personClass = new PersonClass();
                personClass.setV_RESULT(map.get("V_INFO") == null ? "" : map.get("V_INFO").toString());
                item.add(personClass);
            }
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*附件上传*/
    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void uploadFile(@RequestParam(value = "file") CommonsMultipartFile file,
                           HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
        List<MasageClass> item = new ArrayList<MasageClass>();

        String V_V_FILETYPECODE = request.getParameter("FileType").toString();// 上传类型
        String V_V_GUID = request.getParameter("GUID").toString();// guid
        String V_V_PLANT = request.getParameter("UpLoadOrg").toString();// 上传人单位
        String V_V_DEPT = request.getParameter("UpLoadDept").toString();// 上传人作业区
        String V_V_PERSON = request.getParameter("UpLoadUser").toString();// 上传人
        String Remark = request.getParameter("Remark").toString();

        String V_V_FILENAME = file.getOriginalFilename();

        V_V_FILENAME = new String(V_V_FILENAME.getBytes("iso-8859-1"), "utf-8");

        InputStream inputStream = file.getInputStream();

        List<Map> result = null;

        result = mobileService.PRO_BASE_FILE_ADD(V_V_GUID, V_V_FILENAME, inputStream, V_V_FILETYPECODE, V_V_PLANT, V_V_DEPT, V_V_PERSON, Remark);

        MasageClass masageClass = new MasageClass();
        masageClass.setRet(result.get(0) == null ? "" : result.get(0).get("V_INFO").toString());
        item.add(masageClass);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*附件下载*/
    @RequestMapping(value = "/downloadFile", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void downloadFile(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                             @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                             HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<MasageClass> item = new ArrayList<MasageClass>();
        List<Map> result = null;
        result = mobileService.PRO_BASE_FILE_DOWNLOAD(V_V_GUID, V_V_FILEGUID);
        String V_V_FILENAME = result.get(0).get("FileName").toString();
        Blob fileblob = (Blob) result.get(0).get("V_BLOB");
        InputStream is = fileblob.getBinaryStream();
        OutputStream fos = response.getOutputStream();

        response.setContentType("application/octet-stream");
        response.setCharacterEncoding("UTF-8");

        response.setHeader("Content-Disposition", "attachment; filename=" + V_V_FILENAME);

        byte[] b = new byte[2048];
        int length;
        while ((length = is.read(b)) > 0) {
            fos.write(b, 0, length);
        }
        MasageClass masageClass = new MasageClass();
        masageClass.setRet(result.get(0) == null ? "" : result.get(0).get("V_INFO").toString());
        item.add(masageClass);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        fos.flush();
        is.close();
        fos.close();
    }

    /*物料查询接口*/
    @RequestMapping(value = "/GetDepartKC_storeid", method = RequestMethod.GET)
    @ResponseBody
    public void GetDepartKC_storeid(@RequestParam(value = "number") Integer number,
                                    @RequestParam(value = "code") String code,
                                    @RequestParam(value = "name") String name,
                                    @RequestParam(value = "sap_plantcode") String sap_plantcode,
                                    @RequestParam(value = "sap_departcode") String sap_departcode,
                                    @RequestParam(value = "storeplace") String storeplace,
                                    @RequestParam(value = "i_from_id") String i_from_id,
                                    @RequestParam(value = "x_personcode") String x_personcode,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map test = new HashMap();
        List<MaterialClass> item = new ArrayList<MaterialClass>();
        List<Map> result = null;
        try {
//            ClassPathResource res = new ClassPathResource("service.properties");
//            Properties pros = new Properties();
//            pros.load(res.getInputStream());

            // http://192.168.89.183/MaterialManage/WebService_SB/WS_EquipService.asmx?WSDL
//            Client client = new Client(new URL(pros.getProperty("WS_Equip")
//                    .trim()));
//            Client client = new Client(new URL("http://10.101.10.19/MaterialManage/WebService_SB/WS_EquipService.asmx?WSDL"));
            Client client = new Client(new URL("http://192.168.1.250/MaterialManage/WebService_SB/WS_EquipService.asmx?WSDL"));

			/*
             * setNumber(1000); setCode(""); setName("");
			 * setSap_plantcode(6300); setSap_departcode(63000003);
			 */

//            Object[] results = client.invoke("GetDepartKC_storeid",
//                    new Object[] { number, code, name, sap_plantcode,
//                            sap_departcode, storeplace, i_from_id });
            Object[] results = client.invoke("GetDepartKC_storeplace",
                    new Object[]{number, code, name, sap_plantcode,
                            sap_departcode, storeplace});

            // System.out.print(results[0].toString());

            Document doc = DocumentHelper.parseText(results[0].toString());

            Element rootElt = doc.getRootElement(); // 获取根节点
            Iterator iter = rootElt.elementIterator("item"); // 获取二级节点
            List<Map> list = new ArrayList<Map>();

            while (iter.hasNext()) {

                Element recordEle = (Element) iter.next(); // 输出下一行

                Map M = new HashMap();

                MaterialClass materialClass = new MaterialClass();
                materialClass.setV_SPAREPART_CODE(recordEle.elementTextTrim("vch_sparepart_code"));
                materialClass.setV_SPAREPART_NAME(recordEle.elementTextTrim("vch_sparepart_name"));
                materialClass.setV_TYPE(recordEle.elementTextTrim("vch_type"));
                materialClass.setV_UNIT(recordEle.elementTextTrim("vch_unit"));
                materialClass.setV_PRICE(recordEle.elementTextTrim("price"));
                item.add(materialClass);

//                M.put("VCH_SPAREPART_CODE",
//                        recordEle.elementTextTrim("vch_sparepart_code"));
//                M.put("VCH_SPAREPART_NAME",
//                        recordEle.elementTextTrim("vch_sparepart_name"));
//                M.put("VCH_TYPE", recordEle.elementTextTrim("vch_type"));
//                M.put("VCH_UNIT", recordEle.elementTextTrim("vch_unit"));
//
//                M.put("PRICE", recordEle.elementTextTrim("price"));
//                M.put("ABLECOUNT", recordEle.elementTextTrim("ablecount"));
//                M.put("VCH_FROMNAME", recordEle.elementTextTrim("vch_fromName"));
//                M.put("ID", recordEle.elementTextTrim("ID"));
//
//                list.add(M);
            }

            // 日志 ---- 日志内容 - 日志报文 - 时间 - 日志类型 - 人员编码
            java.util.Date currentTime = new java.util.Date();
            SimpleDateFormat Format = new SimpleDateFormat("yyyy-MM-dd");
            String titleNameTime = Format.format(currentTime);

            mobileService.PRO_LOG_TEXT_SET("服务日志:" + "http://10.101.10.19/MaterialManage/WebService_SB/WS_EquipService.asmx?WSDL",
                    null, titleNameTime, "WS_Equip", x_personcode);
            test.put("list", list);

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }
}
