package org.building.pm.controller;

import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.PM_14Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.*;


/**
 * Created by Administrator on 17-4-23.
 */
@Controller
@RequestMapping("/app/pm/PM_14")
public class PM_14Controller {

    @Autowired
    private PM_14Service pm_14Service;

    @RequestMapping(value = "/PM_14_FAULT_TYPE_ITEM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_TYPE_ITEM_SEL(
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PM_14_FAULT_TYPE_ITEM_SEL();

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_14_FAULT_ITEM_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_14_FAULT_ITEM_SET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
            @RequestParam(value = "V_V_FAULT_TYPE") String V_V_FAULT_TYPE,
            @RequestParam(value = "V_V_FAULT_YY") String V_V_FAULT_YY,
            @RequestParam(value = "V_V_BZ") String V_V_BZ,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_IP") String V_V_IP,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        if(V_V_GUID == null || V_V_GUID.equals(""))
        {
            V_V_GUID = UUID.randomUUID().toString();
        }

        System.out.println(V_V_GUID  + "++++++++++++++++++");
        result = pm_14Service.PM_14_FAULT_ITEM_SET(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE,V_V_EQUTYPE,V_V_EQUCODE,V_V_EQUCHILD_CODE,V_V_FAULT_TYPE,V_V_FAULT_YY,V_V_BZ,V_V_PERCODE,V_V_IP);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_14_FAULT_ITEM_DATA_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_DATA_DEL(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                         @RequestParam(value = "V_V_IP") String V_V_IP,
                                                         @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = pm_14Service.PM_14_FAULT_ITEM_DATA_DEL(V_V_PERCODE, V_V_IP, V_V_GUID);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_14_FAULT_ITEM_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_DEL(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                    @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        String V_V_IP =request.getRemoteAddr();


        HashMap data = pm_14Service.PM_14_FAULT_ITEM_DEL(V_V_PERCODE, V_V_IP, V_V_GUID);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    //PM_14Controller 保存方法

   /* @RequestMapping(value = "/PM_14_FAULT_ITEM_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_DATA_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
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
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PM_14_FAULT_ITEM_DATA_SET(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE,
                V_V_EQUCHILD_CODE, V_V_FAULT_GUID, V_V_FAULT_TYPE, V_V_FAULT_YY, V_V_FINDTIME,V_V_FAULT_XX, V_V_FAULT_LEVEL,V_V_JJBF,
                V_V_FILE_GUID,V_V_INTIME,V_V_PERCODE,V_V_IP);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }*/
    //pm_1407zsbmc
    @RequestMapping(value = "/PRO_SAP_EQU_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_SAP_EQU_VIEW( String V_V_PERSONCODE,
                                                 String V_V_DEPTCODE,
                                                 String V_V_DEPTNEXTCODE,
                                                 String V_V_EQUTYPECODE,
                                                 String V_V_EQUCODE,
                                                HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_14Service.PRO_SAP_EQU_VIEW(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTNEXTCODE,V_V_EQUTYPECODE,V_V_EQUCODE);
        List<Map<String, Object>> pm_1407 = (List) data.get("list");

        result.put("list", pm_1407);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_14_FAULT_ITEM_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_DATA_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                         @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                         @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                                         @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                         @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
                                                         @RequestParam(value = "V_V_FAULT_TYPE") String V_V_FAULT_TYPE,
                                                         @RequestParam(value = "V_V_FAULT_YY") String V_V_FAULT_YY,
                                                         @RequestParam(value = "V_V_FINDTIME_B") String V_V_FINDTIME_B,
                                                         @RequestParam(value = "V_V_FINDTIME_E") String V_V_FINDTIME_E,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PM_14_FAULT_ITEM_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE,
                V_V_EQUCODE, V_V_EQUCHILD_CODE, V_V_FAULT_TYPE, V_V_FAULT_YY, V_V_FINDTIME_B, V_V_FINDTIME_E);
        List<Map<String, Object>> pm_1407list = (List) data.get("list");
        result.put("list", pm_1407list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_14_FAULT_ITEM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_SEL (@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                     @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                     @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                                     @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                     @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
                                                     @RequestParam(value = "V_V_FAULT_TYPE") String V_V_FAULT_TYPE,
                                                     @RequestParam(value = "V_V_FAULT_YY") String V_V_FAULT_YY,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PM_14_FAULT_ITEM_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE,
                V_V_EQUCODE, V_V_EQUCHILD_CODE, V_V_FAULT_TYPE, V_V_FAULT_YY);
        //System.out.println(data);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        if (pm_06list != null) {
            for (int i = 0; i < pm_06list.size(); i++) {
                pm_06list.get(i).put("leaf", true);
            }
        }

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }


    @RequestMapping(value = "/PM_14_FAULT_ITEM_DATA_PER_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_DATA_PER_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                             @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                                             @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                             @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
                                                             @RequestParam(value = "V_V_FAULT_TYPE") String V_V_FAULT_TYPE,
                                                             @RequestParam(value = "V_V_FAULT_YY") String V_V_FAULT_YY,
                                                             @RequestParam(value = "V_V_PERSON") String V_V_PERSON,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PM_14_FAULT_ITEM_DATA_PER_SEL(V_V_ORGCODE,V_V_DEPTCODE,V_V_EQUTYPE,V_V_EQUCODE,V_V_EQUCHILD_CODE,
                V_V_FAULT_TYPE,V_V_FAULT_YY,V_V_PERSON);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_FILE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_FILE_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                             @RequestParam(value = "V_V_FILETYPECODE") String V_V_FILETYPECODE,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PRO_BASE_FILE_SEL(V_V_GUID, V_V_FILETYPECODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_14_FAULT_ITEM_DATA_MODEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_DATA_MODEL(@RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                  @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                  @RequestParam(value = "V_V_NAME") String V_V_NAME,
                                                  @RequestParam(value = "V_V_PROCESS") String V_V_PROCESS,
                                                  @RequestParam(value = "V_V_WORKING") String V_V_WORKING,
                                                  @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                                                  @RequestParam(value = "V_V_SPARE") String V_V_SPARE,
                                                  @RequestParam(value = "V_V_VEHICLE") String V_V_VEHICLE,
                                                  @RequestParam(value = "V_V_TOOL") String V_V_TOOL,
                                                  @RequestParam(value = "V_V_HOUR") String V_V_HOUR,
                                                  @RequestParam(value = "V_V_MEMO") String V_V_MEMO,
                                                  @RequestParam(value = "V_V_CONTENT1") String V_V_CONTENT1,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PM_14_FAULT_ITEM_DATA_MODEL(V_V_EQUTYPECODE, V_V_GUID, V_V_NAME, V_V_PROCESS, V_V_WORKING,
                V_V_CONTENT,V_V_SPARE,V_V_VEHICLE,V_V_TOOL,V_V_HOUR,V_V_MEMO,V_V_CONTENT1);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_14_FAULT_ITEM_DATA_FEEDBACK", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_DATA_FEEDBACK(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                           @RequestParam(value = "V_V_IP") String V_V_IP,
                                                           @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                           @RequestParam(value = "V_V_FEEDBACK") String V_V_FEEDBACK,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PM_14_FAULT_ITEM_DATA_FEEDBACK(V_V_PERCODE, V_V_IP, V_V_GUID, V_V_FEEDBACK);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    /*@RequestMapping(value = "/PM_14_FAULT_ITEM_DATA_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_DATA_DEL(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                              @RequestParam(value = "V_V_IP") String V_V_IP,
                                                              @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                              HttpServletRequest request,
                                                              HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PM_14_FAULT_ITEM_DATA_DEL(V_V_PERCODE, V_V_IP, V_V_GUID);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }*/

    @RequestMapping(value = "/PM_14_FAULT_ITEM_DATA_SEND", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_DATA_SEND(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                         @RequestParam(value = "V_V_IP") String V_V_IP,
                                                         @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PM_14_FAULT_ITEM_DATA_SEND(V_V_PERCODE, V_V_IP, V_V_GUID);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    /*@RequestMapping(value = "/PM_14_FAULT_ITEM_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_DATA_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                           @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                           @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                                           @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                           @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
                                                           @RequestParam(value = "V_V_FAULT_GUID") String V_V_FAULT_GUID,
                                                           @RequestParam(value = "V_V_FAULT_TYPE") String V_V_FAULT_TYPE,
                                                           @RequestParam(value = "V_V_FAULT_YY") String V_V_FAULT_YY,
                                                           @RequestParam(value = "V_V_FAULT_XX") String V_V_FAULT_XX,
                                                           @RequestParam(value = "V_V_JJBF") String V_V_JJBF,
                                                           @RequestParam(value = "V_V_FAULT_LEVEL") String V_V_FAULT_LEVEL,
                                                           @RequestParam(value = "V_V_PER_CLASS") String V_V_PER_CLASS,
                                                           @RequestParam(value = "V_V_JJ") String V_V_JJ,
                                                           @RequestParam(value = "V_V_WL") String V_V_WL,
                                                           @RequestParam(value = "V_V_PART") String V_V_PART,
                                                           @RequestParam(value = "V_V_MATERIAL") String V_V_MATERIAL,
                                                           @RequestParam(value = "V_V_TIME") String V_V_TIME,
                                                           @RequestParam(value = "V_V_FILE_GUID") String V_V_FILE_GUID,
                                                           @RequestParam(value = "V_V_INTIME") String V_V_INTIME,
                                                           @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                           @RequestParam(value = "V_V_IP") String V_V_IP,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PM_14_FAULT_ITEM_DATA_SET(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE,
                V_V_EQUCHILD_CODE, V_V_FAULT_GUID, V_V_FAULT_TYPE, V_V_FAULT_YY, V_V_FAULT_XX, V_V_JJBF, V_V_FAULT_LEVEL,
                V_V_PER_CLASS,V_V_JJ,V_V_WL,V_V_PART,V_V_MATERIAL,V_V_TIME,V_V_FILE_GUID,V_V_INTIME,V_V_PERCODE,V_V_IP);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }*/

    /*@RequestMapping(value = "/PRO_BASE_FILE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_FILE_DEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PRO_BASE_FILE_DEL( V_V_GUID);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }*/

    @RequestMapping(value = "/PM_14_FAULT_ITEM_DATA_SET1", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_DATA_SET1(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                           @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                           @RequestParam(value = "V_V_IP") String V_V_IP,
                                                           @RequestParam(value = "V_V_PER_CLASS") String V_V_PER_CLASS,
                                                           @RequestParam(value = "V_V_JJ") String V_V_JJ,
                                                           @RequestParam(value = "V_V_TIME") String V_V_TIME,
                                                           @RequestParam(value = "V_V_WL") String V_V_WL,
                                                           @RequestParam(value = "V_V_BZ") String V_V_BZ,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PM_14_FAULT_ITEM_DATA_SET1(V_V_GUID, V_V_PERCODE, V_V_IP, V_V_PER_CLASS, V_V_JJ,
                V_V_TIME, V_V_WL, V_V_BZ);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_CLASS_M_QUERY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_CLASS_M_QUERY(@RequestParam(value = "IN_DEPARTCODE") String IN_DEPARTCODE,
                                                 @RequestParam(value = "IN_CLASSNAME") String IN_CLASSNAME,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PRO_CLASS_M_QUERY(IN_DEPARTCODE, IN_CLASSNAME);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }
    //==========================================关键机具=========================================
    //IP
    @RequestMapping(value = "/GetIP", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GetIP( HttpServletRequest request,HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        InetAddress address = InetAddress.getLocalHost();
        String str=address.toString();
        result.put("IP", str);
        result.put("success", true);
        return result;
    }
    //车辆
    @RequestMapping(value = "/PM_14_CL_DIC_CAR_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_CL_DIC_CAR_VIEW(@RequestParam(value = "V_V_FLAG") String V_V_FLAG,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_14Service.PM_14_CL_DIC_CAR_VIEW(V_V_FLAG);
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);
        return result;
    }
    //等候地点
    @RequestMapping(value = "/PM_14_CL_WORKORDER_DATA_DROP", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_CL_WORKORDER_DATA_DROP(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                            @RequestParam(value = "V_V_CLOUMSNAME") String V_V_CLOUMSNAME,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_14Service.PM_14_CL_WORKORDER_DATA_DROP(V_V_PERCODE, V_V_CLOUMSNAME);
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);
        return result;
    }
    //添加
    @RequestMapping(value = "/PM_14_CL_WORKORDER_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_CL_WORKORDER_DATA_SET(@RequestParam(value = "V_V_IP") String V_V_IP,
                                                           @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                           @RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
                                                           @RequestParam(value = "V_V_CARCODE") String V_V_CARCODE,
                                                           @RequestParam(value = "V_D_DATETIME_WITE") String V_D_DATETIME_WITE,
                                                           @RequestParam(value = "V_V_DD_WITE") String V_V_DD_WITE,
                                                           @RequestParam(value = "V_V_WP_WITE") String V_V_WP_WITE,
                                                           @RequestParam(value = "V_V_MEMO") String V_V_MEMO,
                                                           @RequestParam(value = "V_V_LXRDH") String V_V_LXRDH,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_14Service.PM_14_CL_WORKORDER_DATA_SET(V_V_IP, V_V_PERCODE, V_V_ORDERID, V_V_CARCODE, V_D_DATETIME_WITE, V_V_DD_WITE, V_V_WP_WITE, V_V_MEMO, V_V_LXRDH);
        String ret = (String) data.get("RET");
        result.put("RET", ret);
        result.put("success", true);
        return result;
    }
    //表格1加载
    @RequestMapping(value = "/PM_14_CL_WORKORDER_DATA_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_CL_WORKORDER_DATA_VIEW(@RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_14Service.PM_14_CL_WORKORDER_DATA_VIEW(V_V_ORDERID);
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);
        return result;
    }
    //删除
    @RequestMapping(value = "/PM_14_CL_WORKORDER_DATA_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_CL_WORKORDER_DATA_DEL(@RequestParam(value = "V_I_ID") String V_I_ID,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_14Service.PM_14_CL_WORKORDER_DATA_DEL(V_I_ID);
        String ret = (String) data.get("RET");
        result.put("RET", ret);
        result.put("success", true);
        return result;
    }
    //确定
    @RequestMapping(value = "/PM_14_WORKORDER_TOOL_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_WORKORDER_TOOL_SET(@RequestParam(value = "V_I_ID") String V_I_ID,
                                                        @RequestParam(value = "V_ORDERGUID") String V_ORDERGUID,
                                                        @RequestParam(value = "V_V_TOOLCODE") String V_V_TOOLCODE,
                                                        @RequestParam(value = "V_V_TOOLNAME") String V_V_TOOLNAME,
                                                        @RequestParam(value = "V_V_USEMAN") String V_V_USEMAN,
                                                        @RequestParam(value = "V_D_USETIME") String V_D_USETIME,
                                                        @RequestParam(value = "V_I_HOUR") String V_I_HOUR,
                                                        @RequestParam(value = "V_I_NUMBER") String V_I_NUMBER,
                                                        @RequestParam(value = "V_V_MEMO") String V_V_MEMO,
                                                        @RequestParam(value = "V_V_RETURNMAN") String V_V_RETURNMAN,
                                                        @RequestParam(value = "V_D_RETURNTIME") String V_D_RETURNTIME,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_14Service.PM_14_WORKORDER_TOOL_SET(V_I_ID, V_ORDERGUID, V_V_TOOLCODE, V_V_TOOLNAME, V_V_USEMAN, V_D_USETIME, V_I_HOUR, V_I_NUMBER, V_V_MEMO, V_V_RETURNMAN, V_D_RETURNTIME);
        String ret = (String) data.get("RET");
        result.put("RET", ret);
        result.put("success", true);
        return result;
    }
    //表格2加载
    @RequestMapping(value = "/PM_14_WORKORDER_TOOL_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_WORKORDER_TOOL_VIEW(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_14Service.PM_14_WORKORDER_TOOL_VIEW(V_V_ORDERGUID);
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);
        return result;
    }
    //表格2删除
    @RequestMapping(value = "/PM_14_WORKORDER_TOOL_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_WORKORDER_TOOL_DEL(@RequestParam(value = "V_I_ID") String V_I_ID,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_14Service.PM_14_WORKORDER_TOOL_DEL(V_I_ID);
        String ret = (String) data.get("RET");
        result.put("RET", ret);
        result.put("success", true);
        return result;
    }
    //tree加载
    @RequestMapping(value = "/PM_14_TOOLLVEHICLE_TREE", method = RequestMethod.POST)
    @ResponseBody
    public  List<Map> PM_14_TOOLLVEHICLE_TREE(@RequestParam(value = "V_TYPE") String V_TYPE,
                                              @RequestParam(value = "V_NAME") String V_NAME,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        List<Map> list = pm_14Service.PM_14_TOOLLVEHICLE_TREE(V_TYPE, V_NAME);
        return list;
    }
    //
    @RequestMapping(value = "/PM_14_WORKORDER_TOOL_RETSTR", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_WORKORDER_TOOL_RETSTR(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_14Service.PM_14_WORKORDER_TOOL_RETSTR(V_V_ORDERGUID);
        String ret = (String) data.get("RET");
        result.put("RET", ret);
        result.put("success", true);
        return result;
    }
    //常用项目加载
    @RequestMapping(value = "/PRO_PM_WORKORDER_TOOL_CY", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_PM_WORKORDER_TOOL_CY(@RequestParam(value = "V_PERCODE") String V_PERCODE,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        List<Map> list = pm_14Service.PRO_PM_WORKORDER_TOOL_CY(V_PERCODE);
        return list;
    }



    //pm140701选择按钮
    @RequestMapping(value = "/PM_14_FAULT_PER_CLASS_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_PER_CLASS_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                         @RequestParam(value = "V_V_CLASSCODE") String V_V_CLASSCODE,
                                                         @RequestParam(value = "V_PERSONCODE_LIST", required = false) List<String> V_PERSONCODE_LIST,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        for (int i = 0; i < V_PERSONCODE_LIST.size(); i++) {
            HashMap data = pm_14Service.PM_14_FAULT_PER_CLASS_SET(V_V_GUID, V_V_CLASSCODE, V_PERSONCODE_LIST.get(i));
            String pm_140701 = (String) data.get("RET");
            result.put("RET", pm_140701);
            result.put("success", true);
        }
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_FILE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_FILE_DEL(@RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PRO_BASE_FILE_DEL(V_V_FILEGUID);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_14_FAULT_ITEM_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_DATA_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
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
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_14Service.PM_14_FAULT_ITEM_DATA_SET(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE,
                V_V_EQUCHILD_CODE, V_V_FAULT_GUID, V_V_FAULT_TYPE, V_V_FAULT_YY, V_V_FINDTIME,V_V_FAULT_XX, V_V_FAULT_LEVEL,V_V_JJBF,
                V_V_FILE_GUID,V_V_INTIME,V_V_PERCODE,V_V_IP);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_CLASS_M_QUERY_P", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_CLASS_M_QUERY_P(@RequestParam(value = "IN_CLASSCODE") String IN_CLASSCODE,
                                                   @RequestParam(value = "start") Integer start,
                                                   @RequestParam(value = "limit") Integer limit,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = pm_14Service.PRO_CLASS_M_QUERY_P(IN_CLASSCODE);
        List<Map<String, Object>> pm_140701list = (List) data.get("list");
        int total = pm_140701list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = pm_140701list.subList(start, total);
                } else {
                    pageList = pm_140701list.subList(start, endPage);
                }
            } else {
                pageList = pm_140701list;
            }
        } else {
            pageList = pm_140701list;
        }
        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);
        return result;
    }


    /*事故EXCEL*/
    @RequestMapping(value = "/PM_14_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PM_14_EXCEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                            @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
                            @RequestParam(value = "V_V_FAULT_TYPE") String V_V_FAULT_TYPE,
                            @RequestParam(value = "V_V_FAULT_YY") String V_V_FAULT_YY,
                            @RequestParam(value = "V_V_FINDTIME_B") String V_V_FINDTIME_B,
                            @RequestParam(value = "V_V_FINDTIME_E") String V_V_FINDTIME_E,
                            HttpServletResponse response)
            throws //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        V_V_FAULT_YY = new String(V_V_FAULT_YY.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = pm_14Service.PM_14_FAULT_ITEM_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE,
                V_V_EQUCODE, V_V_EQUCHILD_CODE, V_V_FAULT_TYPE,V_V_FAULT_YY, V_V_FINDTIME_B, V_V_FINDTIME_E);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("发现时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("设备类型");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("部件");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("故障类型");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("故障原因");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("故障现象");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("故障等级");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("解决办法");
        cell.setCellStyle(style);



        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i+1);

                row.createCell((short) 1).setCellValue(map.get("V_FINDTIME") == null ? "" : map.get("V_FINDTIME").toString());

                row.createCell((short) 2).setCellValue(map.get("V_EQUTYPENAME") == null ? "" : map.get("V_EQUTYPENAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_EQUCHILD_NAME") == null ? "" : map.get("V_EQUCHILD_NAME").toString());

                row.createCell((short) 5).setCellValue(map.get("V_TYPENAME") == null ? "" : map.get("V_TYPENAME").toString());

                row.createCell((short) 6).setCellValue(map.get("V_FAULT_YY") == null ? "" : map.get("V_FAULT_YY").toString());

                row.createCell((short) 7).setCellValue(map.get("V_FAULT_XX") == null ? "" : map.get("V_FAULT_XX").toString());

                row.createCell((short) 8).setCellValue(map.get("V_FAULT_LEVEL") == null ? "" : map.get("V_FAULT_LEVEL").toString());

                row.createCell((short) 9).setCellValue(map.get("V_JJBF") == null ? "" : map.get("V_JJBF").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("设备故障查询表.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
                response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/PRO_WORKORDER_CARSEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_WORKORDER_CARSEL(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_14Service.PRO_WORKORDER_CARSEL(V_V_ORDERGUID);
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);
        return result;
    }

    /*
   * 附件查询
   * */
    /*@RequestMapping(value = "PRO_BASE_FILE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_FILE_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                               @RequestParam(value = "V_V_FILETYPE") String V_V_FILETYPE,
                                               HttpServletRequest request)
            throws SQLException, UnsupportedEncodingException {
        Map<String, Object> result = pm_14Service.PRO_BASE_FILE_SEL(V_V_GUID, V_V_FILETYPE);
        return result;
    }*/




    @RequestMapping(value = "/PRO_BASE_FILE_ADDINSERT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_FILE_ADDINSERT(@RequestParam(value = "V_V_GUID2") String V_V_GUID2,
                                                  @RequestParam(value = "V_V_FILENAME2") String V_V_FILENAME2,
                                                  @RequestParam(value = "V_V_FILEBLOB2") MultipartFile V_V_FILEBLOB2,
                                                  @RequestParam(value = "V_V_FILETYPECODE2") String V_V_FILETYPECODE2,
                                                  @RequestParam(value = "V_V_PLANT2") String V_V_PLANT2,
                                                  @RequestParam(value = "V_V_DEPT2") String V_V_DEPT2,
                                                  @RequestParam(value = "V_V_PERSON2") String V_V_PERSON2,
                                                  @RequestParam(value = "V_V_REMARK2") String V_V_REMARK2,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = pm_14Service.PRO_BASE_FILE_ADD(V_V_GUID2, V_V_FILENAME2, V_V_FILEBLOB2.getInputStream(), V_V_FILETYPECODE2, V_V_PLANT2, V_V_DEPT2, V_V_PERSON2, V_V_REMARK2);

        String pm_1012 = (String) data.get("RET");

        result.put("RET", pm_1012);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_FILE_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_FILE_ADD(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                 @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
                                                 @RequestParam(value = "V_V_FILEBLOB") MultipartFile V_V_FILEBLOB,
                                                 @RequestParam(value = "V_V_FILETYPECODE") String V_V_FILETYPECODE,
                                                 @RequestParam(value = "V_V_PLANT") String V_V_PLANT,
                                                 @RequestParam(value = "V_V_DEPT") String V_V_DEPT,
                                                 @RequestParam(value = "V_V_PERSON") String V_V_PERSON,
                                                 @RequestParam(value = "V_V_REMARK") String V_V_REMARK,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = pm_14Service.PRO_BASE_FILE_ADD(V_V_GUID, V_V_FILENAME, V_V_FILEBLOB.getInputStream(), V_V_FILETYPECODE, V_V_PLANT, V_V_DEPT, V_V_PERSON, V_V_REMARK);

        String pm_1012 = (String) data.get("RET");

        result.put("RET", pm_1012);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_07_DEFECT_MANY_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_07_DEFECT_MANY_EDIT(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                          @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                          @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
                                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                          @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                          @RequestParam(value = "V_V_EQUCHILDCODE") String V_V_EQUCHILDCODE,
                                          @RequestParam(value = "V_V_IDEA") String V_V_IDEA,
                                          @RequestParam(value = "V_V_LEVEL") String V_V_LEVEL,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map result = pm_14Service.PRO_PM_07_DEFECT_MANY_EDIT(V_V_GUID, V_V_PERCODE, V_V_DEFECTLIST,  V_V_DEPTCODE, V_V_EQUCODE,
                V_V_EQUCHILDCODE, V_V_IDEA,V_V_LEVEL);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_07_DEFECT_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_07_DEFECT_DEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                    @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = pm_14Service.PRO_PM_07_DEFECT_DEL(V_V_GUID,V_V_PERCODE);
        return result;
    }

}
