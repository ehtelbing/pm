package org.building.pm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.building.pm.service.PM_22Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2017/1/22.
 * <p>
 * �豸�¹�controller
 */
@Controller
@RequestMapping("/app/pm/PM_22")
public class PM_22Controller {

    @Autowired
    private PM_22Service pm_22Service;

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_EDITVIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_EDITVIEW(
            @RequestParam(value = "V_V_IP") String V_V_IP,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_D_INDATE_B") String V_D_INDATE_B,
            @RequestParam(value = "V_D_INDATE_E") String V_D_INDATE_E,
            @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
            @RequestParam(value = "V_V_DEFECT") String V_V_DEFECT,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_22Service.PRO_PM_EQUREPAIRPLAN_EDITVIEW(V_V_IP, V_V_PERCODE, V_D_INDATE_B, V_D_INDATE_E,
                V_V_SPECIALTY, V_V_DEFECT);
        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);

        return data;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_VIEW(
            @RequestParam(value = "V_V_IP") String V_V_IP,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_D_INDATE_B") String V_D_INDATE_B,
            @RequestParam(value = "V_D_INDATE_E") String V_D_INDATE_E,
            @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
            @RequestParam(value = "V_V_DEFECT") String V_V_DEFECT,
            @RequestParam(value = "V_V_FLAG") String V_V_FLAG,


            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_22Service.PRO_PM_EQUREPAIRPLAN_VIEW(V_V_IP, V_V_PERCODE, V_V_ORGCODE, V_V_DEPTCODE,
                V_D_INDATE_B, V_D_INDATE_E,V_V_SPECIALTY,V_V_DEFECT,V_V_FLAG);
        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);

        return data;
    }

    @RequestMapping(value = "/PRO_PM_04_PROJECT_DATA_ITEM_V", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_04_PROJECT_DATA_ITEM_V(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
            @RequestParam(value = "V_V_PROJECT_CODE") String V_V_PROJECT_CODE,
            @RequestParam(value = "V_V_PROJECT_NAME") String V_V_PROJECT_NAME,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_BY1") String V_V_BY1,
            @RequestParam(value = "V_V_BY2") String V_V_BY2,


            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_22Service.PRO_PM_04_PROJECT_DATA_ITEM_V(V_V_YEAR, V_V_MONTH, V_V_ORGCODE, V_V_SPECIALTY,
                V_V_PROJECT_CODE, V_V_PROJECT_NAME, V_V_CONTENT, V_V_BY1, V_V_BY2);
        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);

        return data;
    }

   /* @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_NEXTPER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_NEXTPER(
            @RequestParam(value = "V_V_IP") String V_V_IP,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_I_STATE") String V_I_STATE,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {


        HashMap data = pm_22Service.PRO_PM_EQUREPAIRPLAN_NEXTPER(V_V_IP, V_V_PERCODE, V_V_PERNAME, V_V_ORGCODE,
                V_V_DEPTCODE, V_V_SPECIALTY,V_V_GUID,V_I_STATE);
        return data;
    }*/

    @RequestMapping(value = "PRO_PM_EQUREPAIRPLAN_NEXTPER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_NEXTPER( @RequestParam(value = "V_V_IP") String V_V_IP,
                                                             @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                             @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                             @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                             @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
                                                             @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                             @RequestParam(value = "V_I_STATE") String V_I_STATE,
                                         HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = pm_22Service.PRO_PM_EQUREPAIRPLAN_NEXTPER(V_V_IP, V_V_PERCODE, V_V_PERNAME, V_V_ORGCODE,
                V_V_DEPTCODE, V_V_SPECIALTY,V_V_GUID,V_I_STATE);
        return result;
    }

    @RequestMapping(value = "PRO_BASE_SPECIALTYTOPERSON_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_SPECIALTYTOPERSON_SEL(@RequestParam(value = "V_V_SPECIALTYCODE") String V_V_SPECIALTYCODE ,
                                                              @RequestParam(value = "V_V_POSTCODE") String V_V_POSTCODE,
                                                              @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                              HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = pm_22Service.PRO_BASE_SPECIALTYTOPERSON_SEL(V_V_SPECIALTYCODE, V_V_POSTCODE,V_V_DEPTCODE);
        return result;
    }

    @RequestMapping(value = "PM_REPAIRDEPT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_REPAIRDEPT_SEL(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                              HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = pm_22Service.PM_REPAIRDEPT_SEL(V_V_DEPTCODE);
        return result;
    }

    @RequestMapping(value = "/PM_RET_DATETIME", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_RET_DATETIME(


            HttpServletRequest request,
            HttpServletResponse response) throws Exception {


        HashMap data = pm_22Service.PM_RET_DATETIME();
        return data;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_CREATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_CREATE(@RequestParam(value = "V_V_IP") String V_V_IP,
                                                           @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                           @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                           @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

       // String V_V_IP =request.getRemoteAddr();


        HashMap data = pm_22Service.PRO_PM_EQUREPAIRPLAN_CREATE(V_V_IP,V_V_PERCODE,V_V_PERNAME, V_V_GUID);
        System.out.println(data+"data+++++++++++++++++++++++");

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_PIC_SET", produces = "text/html;charset=UTF-8",method = RequestMethod.POST)
    @ResponseBody
    public String PRO_PM_EQUREPAIRPLAN_PIC_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                 @RequestParam(value = "V_V_PICMOME") String V_V_PICMOME,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = pm_22Service.PRO_PM_EQUREPAIRPLAN_PIC_SET(V_V_GUID, V_V_PICMOME);

        String pm_1012 = (String) data.get("RET");

        //for(int i = 0; i < data.get("V_V_PICGUID").)
        String V_V_PICGUID = (String) data.get("V_V_PICGUID");
        //上传到数据库之后 开始上传到服务器
        MultipartHttpServletRequest multipartRequest  =  (MultipartHttpServletRequest) request;
        //  获得第1张图片（根据前台的name名称得到上传的文件）
        MultipartFile imgFile1  =  multipartRequest.getFile("V_V_FILEBLOB");
        UploadUtil uploadutil = new UploadUtil();
        String fileName = imgFile1.getOriginalFilename();


        try {
            uploadutil.uploadImage1(request, imgFile1, imgFile1.getContentType(), fileName,V_V_GUID,V_V_PICGUID);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }


        result.put("RET", pm_1012);
        result.put("V_V_PICGUID", V_V_PICGUID);
        result.put("success", true);


        try {
            ObjectMapper mapper = new ObjectMapper();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            dateFormat.setLenient(false);
            mapper.setDateFormat(dateFormat);
            return mapper.writeValueAsString(result);
        }
        catch (JsonProcessingException e) {
            return "{success:false}";
        }
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_PIC_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_PIC_VIEW (@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_22Service.PRO_PM_EQUREPAIRPLAN_PIC_VIEW(V_V_GUID);
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

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_PIC_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_PIC_DEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                    @RequestParam(value = "V_V_PICGUID") String V_V_PICGUID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        String V_V_IP =request.getRemoteAddr();


        HashMap data = pm_22Service.PRO_PM_EQUREPAIRPLAN_PIC_DEL(V_V_GUID, V_V_PICGUID);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_DEL(@RequestParam(value = "V_V_IP") String V_V_IP,
                                                        @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                        @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

         V_V_IP =request.getRemoteAddr();


        HashMap data = pm_22Service.PRO_PM_EQUREPAIRPLAN_DEL(V_V_IP, V_V_PERCODE,V_V_GUID);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_SP", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_SP(   @RequestParam(value = "V_V_IP") String V_V_IP,
                                                           @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                           @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                           @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                           @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                           @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
                                                           @RequestParam(value = "V_V_NEXTSPR") String V_V_NEXTSPR,
                                                           @RequestParam(value = "V_V_SP") String V_V_SP,
                                                           @RequestParam(value = "V_V_YJ") String V_V_YJ,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

         V_V_IP =request.getRemoteAddr();


        HashMap data = pm_22Service.PRO_PM_EQUREPAIRPLAN_SP(V_V_IP, V_V_PERCODE,V_V_PERNAME,V_V_ORGCODE, V_V_DEPTCODE,V_V_GUID,V_V_FLAG, V_V_NEXTSPR,V_V_SP,V_V_YJ);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TOFXJH", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_TOFXJH(   @RequestParam(value = "V_V_IP") String V_V_IP,
                                                          @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                          @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                          @RequestParam(value = "V_V_PROJECTCODE_GS") String V_V_PROJECTCODE_GS,
                                                          @RequestParam(value = "V_V_REPAIRDEPT_GS") String V_V_REPAIRDEPT_GS,
                                                          @RequestParam(value = "V_F_MONEY_GS") String V_F_MONEY_GS,
                                                          @RequestParam(value = "V_D_INDATE_GS") String V_D_INDATE_GS,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        V_V_IP =request.getRemoteAddr();


        HashMap data = pm_22Service.PRO_PM_EQUREPAIRPLAN_TOFXJH(V_V_IP, V_V_PERCODE, V_V_GUID, V_V_PROJECTCODE_GS, V_V_REPAIRDEPT_GS, V_F_MONEY_GS, V_D_INDATE_GS);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_SPNO", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_SPNO(   @RequestParam(value = "V_V_IP") String V_V_IP,
                                                          @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                          @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                          @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                          @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                          @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
                                                          @RequestParam(value = "V_V_NEXTSPR") String V_V_NEXTSPR,
                                                          @RequestParam(value = "V_V_SP") String V_V_SP,
                                                          @RequestParam(value = "V_V_YJ") String V_V_YJ,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        V_V_IP =request.getRemoteAddr();


        HashMap data = pm_22Service.PRO_PM_EQUREPAIRPLAN_SP(V_V_IP, V_V_PERCODE,V_V_PERNAME,V_V_ORGCODE, V_V_DEPTCODE,V_V_GUID,V_V_FLAG, V_V_NEXTSPR,V_V_SP,V_V_YJ);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_SET(
            @RequestParam(value = "V_V_IP") String V_V_IP,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
            @RequestParam(value = "V_V_PROJECTNAME") String V_V_PROJECTNAME,
            @RequestParam(value = "V_V_PLANDATE") String V_V_PLANDATE,
            @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
            @RequestParam(value = "V_V_SPECIALTYNAME") String V_V_SPECIALTYNAME,
            @RequestParam(value = "V_V_SPECIALTYMANCODE") String V_V_SPECIALTYMANCODE,
            @RequestParam(value = "V_V_SPECIALTYMAN") String V_V_SPECIALTYMAN,
            @RequestParam(value = "V_F_MONEYUP") Double V_F_MONEYUP,
            @RequestParam(value = "V_F_MONEYBUDGET") Double V_F_MONEYBUDGET,
            @RequestParam(value = "V_V_REPAIRDEPTTYPE") String V_V_REPAIRDEPTTYPE,
            @RequestParam(value = "V_V_REPAIRDEPTCODE") String V_V_REPAIRDEPTCODE,
            @RequestParam(value = "V_V_REPAIRDEPT") String V_V_REPAIRDEPT,
            @RequestParam(value = "V_V_DEFECT") String V_V_DEFECT,
            @RequestParam(value = "V_V_MEASURE") String V_V_MEASURE,
            @RequestParam(value = "V_I_RUSHTO") String V_I_RUSHTO,
            @RequestParam(value = "V_V_PROJECTCODE_GS") String V_V_PROJECTCODE_GS,
            @RequestParam(value = "V_V_REPAIRDEPT_GS") String V_V_REPAIRDEPT_GS,
            @RequestParam(value = "V_F_MONEY_GS") String V_F_MONEY_GS,
            @RequestParam(value = "V_D_INDATE_GS") String V_D_INDATE_GS,
            @RequestParam(value = "V_I_YEAR_PLAN") String V_I_YEAR_PLAN,
            @RequestParam(value = "V_I_MONTH_PLAN") String V_I_MONTH_PLAN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
         V_V_IP =request.getRemoteAddr();

        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = pm_22Service.PRO_PM_EQUREPAIRPLAN_SET(V_V_IP, V_V_PERCODE, V_V_PERNAME, V_V_GUID, V_V_DEPTCODE, V_V_DEPTNAME, V_V_PROJECTNAME, V_V_PLANDATE, V_V_SPECIALTY, V_V_SPECIALTYNAME, V_V_SPECIALTYMANCODE
        ,V_V_SPECIALTYMAN, V_F_MONEYUP, V_F_MONEYBUDGET, V_V_REPAIRDEPTTYPE, V_V_REPAIRDEPTCODE, V_V_REPAIRDEPT, V_V_DEFECT, V_V_MEASURE, V_I_RUSHTO, V_V_PROJECTCODE_GS, V_V_REPAIRDEPT_GS,
                V_F_MONEY_GS, V_D_INDATE_GS, V_I_YEAR_PLAN, V_I_MONTH_PLAN);
        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_SEND", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_SEND(
            @RequestParam(value = "V_V_IP") String V_V_IP,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_I_STATE") String V_I_STATE,
            @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
            @RequestParam(value = "V_V_NEXTSPR") String V_V_NEXTSPR,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        V_V_IP =request.getRemoteAddr();


        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = pm_22Service.PRO_PM_EQUREPAIRPLAN_SEND(V_V_IP, V_V_PERCODE, V_V_PERNAME, V_V_ORGCODE, V_V_DEPTCODE, V_V_GUID, V_I_STATE, V_V_FLAG, V_V_NEXTSPR);
        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_WO_FLOW_DATA_SPVIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_WO_FLOW_DATA_SPVIEW(@RequestParam(value = "V_V_DBGUID") String V_V_DBGUID,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();



        HashMap data = pm_22Service.PRO_WO_FLOW_DATA_SPVIEW(V_V_DBGUID);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_SAP_EQU_GET_C", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_SAP_EQU_GET_C(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                 @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                @RequestParam(value = "V_V_EQUCODE") String  V_V_EQUCODE,
                                                HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_22Service.PRO_SAP_EQU_GET_C(V_V_PERSONCODE, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPECODE, V_V_EQUCODE);
        List<Map<String, Object>> pm_1407 = (List) data.get("list");

        result.put("list", pm_1407);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_DEFECT_GC_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_DEFECT_GC_SET(
            @RequestParam(value = "V_V_GUID_GC") String V_V_GUID_GC,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_EQUCHILDCODE") String V_V_EQUCHILDCODE,
            @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
            @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
            @RequestParam(value = "V_V_PERNAME_FX") String V_V_PERNAME_FX,
            @RequestParam(value = "V_V_SOURCE_GRADE") String V_V_SOURCE_GRADE,
            @RequestParam(value = "V_D_DEFECTDATE") String V_D_DEFECTDATE,
            @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
            @RequestParam(value = "V_V_IDEA") String V_V_IDEA,
            @RequestParam(value = "V_V_ISTODIC") String V_V_ISTODIC,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_22Service.PRO_PM_DEFECT_GC_SET(V_V_GUID_GC, V_V_PERCODE, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPECODE, V_V_EQUCODE, V_V_EQUCHILDCODE, V_V_REPAIRMAJOR_CODE, V_V_SOURCECODE, V_V_PERNAME_FX, V_V_SOURCE_GRADE
                ,V_D_DEFECTDATE, V_V_DEFECTLIST, V_V_IDEA, V_V_ISTODIC);
        String pm_06 = (String) data.get("RET");
        List<Map<String, Object>> pm_1407 = (List) data.get("list");

        result.put("RET", pm_06);
        result.put("list", pm_1407);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_DEFECT_GC_TOWORK", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_DEFECT_GC_TOWORK(
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_GUID_GC") String V_V_GUID_GC,
            @RequestParam(value = "V_V_GUID_QX") String V_V_GUID_QX,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();




        HashMap data = pm_22Service.PRO_PM_DEFECT_GC_TOWORK(V_V_PERCODE, V_V_GUID_GC, V_V_GUID_QX);
        String pm_06 = (String) data.get("RET");
        List<Map<String, Object>> pm_1407 = (List) data.get("list");

        result.put("RET", pm_06);
        result.put("list", pm_1407);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_DEFECT_DESCRIPTION_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_DEFECT_DESCRIPTION_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_22Service.PRO_PM_DEFECT_DESCRIPTION_SEL(V_V_ORGCODE, V_V_EQUTYPECODE, V_V_DEFECTLIST);
        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);

        return data;
    }

    //类型
    @RequestMapping(value = "/PM_04_PROJECT_TYPE_DROP", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_04_PROJECT_TYPE_DROP(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_22Service.PM_04_PROJECT_TYPE_DROP();

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

}
