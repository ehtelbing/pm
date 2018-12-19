package org.building.pm.controller;

import javafx.application.Application;
import org.activiti.bpmn.converter.CallActivityXMLConverter;
import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.Dx_fileService;
import org.building.pm.webpublic.MasageClass;
import org.building.pm.webservice.MMService;
import org.codehaus.xfire.client.Client;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.ExtensionInstallationException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.filechooser.FileSystemView;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

@Controller
@RequestMapping("/app/pm/dxfile/")
public class Dx_fileController {
    @Autowired
    private Dx_fileService dx_fileService;

    @Value("#{configProperties['MMEqu.url']}")
    private String MMEquurl;

    @RequestMapping(value = "PM_EDUNOTOWORKORDER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_EDUNOTOWORKORDER(@RequestParam(value = "V_EDUCODE") String V_EDUCODE,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = dx_fileService.PM_EDUNOTOWORKORDER(V_EDUCODE);
        return setPage(request, response, data);
    }

    //---附件类型查询(大修、模型）
    @RequestMapping(value = "FILETYPE_GETLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> FILETYPE_GETLIST(@RequestParam(value = "SIGN") String SIGN,
                                                HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {
        Map<String, Object> result = dx_fileService.FILETYPE_GETLIST(SIGN);
        return result;
    }

    //大修附件查询
    @RequestMapping(value = "PM_03_PLAN_PROJECT_FILE_SEL2", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_PROJECT_FILE_SEL2(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
            @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE) throws Exception {
        Map result = dx_fileService.PM_03_PLAN_PROJECT_FILE_SEL2(V_V_GUID, V_V_FILEGUID, V_V_FILENAME, V_V_TYPE);
        return result;
    }

    /*检修模型添加附件*/
    @RequestMapping(value = "PM_MODEL_FILE_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_MODEL_FILE_ADD(
            @RequestParam(value = "upload") MultipartFile file,
            @RequestParam(value = "V_V_MODE_GUID") String V_V_MODE_GUID,
            @RequestParam(value = "V_V_INPERCODE") String V_V_INPERCODE,
            @RequestParam(value = "V_V_INPERNAME") String V_V_INPERNAME,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE
    ) throws Exception {
        String V_V_FILENAME = file.getOriginalFilename();
        InputStream V_V_BLOB = file.getInputStream();
        String V_V_FILETYPE = file.getContentType();
        Map result = dx_fileService.PM_MODEL_FILE_ADD(V_V_FILENAME, V_V_BLOB, V_V_FILETYPE, V_V_MODE_GUID, V_V_INPERCODE, V_V_INPERNAME, V_V_TYPE);
        return result;
    }

    /*检修模型附件下载*/
    @RequestMapping(value = "PM_MODEL_FILE_DOWN", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PM_MODEL_FILE_DOWN(
            @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID
            , HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
        List<MasageClass> item = new ArrayList<MasageClass>();
        Map<String, Object> data = dx_fileService.PM_MODEL_FILE_DOWN(V_V_FILEGUID);
        List list = (List) data.get("list");
        Map listmap = (Map) list.get(0);
        String A_FILENAME = listmap.get("V_FILENAME").toString();
        ;
        Blob blob = (Blob) data.get("V_V_BLOB");
        InputStream in = blob.getBinaryStream();
        OutputStream out = response.getOutputStream();
        response.setContentType("application/octet-stream");

        A_FILENAME = URLDecoder.decode(A_FILENAME, "utf-8");
        response.setCharacterEncoding("UTF-8");
        response.addHeader("Content-Disposition", "attachment;filename=" + new String(A_FILENAME.getBytes("gbk"), "iso8859-1"));
        byte[] b = new byte[2048];
        int length;
        while ((length = in.read(b)) > 0) {
            out.write(b, 0, length);
        }
        // try{
        MasageClass masageClass = new MasageClass();
        masageClass.setRet(data.get(0) == null ? "" : "success");
        item.add(masageClass);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        out.flush();
        in.close();
        out.close();
//        }catch(Exception e){
//            e.printStackTrace();
//        }
    }

    /*检修模型附件查询*/
    @RequestMapping(value = "PM_MODEL_FILE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_MODEL_FILE_SEL(
            @RequestParam(value = "V_V_MODE_GUID") String V_V_MODE_GUID,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE
    ) throws Exception {

        Map result = dx_fileService.PM_MODEL_FILE_SEL(V_V_MODE_GUID, V_V_TYPE);
        return result;
    }

    /*检修模型附件删除*/
    @RequestMapping(value = "PM_MODEL_FILE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_MODEL_FILE_DEL(
            @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID
    ) throws Exception {

        Map result = dx_fileService.PM_MODEL_FILE_DEL(V_V_FILEGUID);
        return result;
    }

    /*检修模型附件写入大修附件*/
    @RequestMapping(value = "PM_MODEL_FILE_INSERT_DXF", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_MODEL_FILE_INSERT_DXF(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
            @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
            @RequestParam(value = "V_V_INPERCODE") String V_V_INPERCODE,
            @RequestParam(value = "V_V_INPERNAME") String V_V_INPERNAME,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
            @RequestParam(value = "V_V_FILETYPE") String V_V_FILETYPE,
            @RequestParam(value = "V_V_MODE_GUID") String V_V_MODE_GUID
    ) throws Exception {

        Map result = dx_fileService.PM_MODEL_FILE_INSERT_DXF(V_V_GUID, V_V_FILEGUID, V_V_FILENAME, V_V_INPERCODE, V_V_INPERNAME, V_V_TYPE, V_V_FILETYPE, V_V_MODE_GUID);
        return result;
    }

    //   大修删除模型附件
    @RequestMapping(value = "PM_MODEL_FILE_DEL_DXF", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_MODEL_FILE_DEL_DXF(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_MODE_GUID") String V_V_MODE_GUID
    ) throws Exception {
        Map result = dx_fileService.PM_MODEL_FILE_DEL_DXF(V_V_GUID, V_V_MODE_GUID);
        return result;
    }

    //   大修查询模型附件
    @RequestMapping(value = "PM_MODEL_FILE_SEL_DXF", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_MODEL_FILE_SEL_DXF(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_MODE_GUID") String V_V_MODE_GUID
    ) throws Exception {
        Map result = dx_fileService.PM_MODEL_FILE_SEL_DXF(V_V_GUID, V_V_MODE_GUID);
        return result;
    }

    /*--2018-11-07 岗位点检 */
    @RequestMapping(value = "BASE_INSPECT_DAY_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map BASE_INSPECT_DAY_SELECT(
            @RequestParam(value = "V_EQUCODE") String V_EQUCODE,
            @RequestParam(value = "V_PERCODE") String V_PERCODE,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
//        HashMap data = dx_fileService.BASE_INSPECT_DAY_SELECT(V_EQUCODE,V_PERCODE);
//        return setPage(request,response,data);
        Map result = dx_fileService.BASE_INSPECT_DAY_SELECT(V_EQUCODE, V_PERCODE);
        return result;
    }

    @RequestMapping(value = "BASE_INSPECT_DAY_INSERT", method = RequestMethod.POST)
    @ResponseBody
    public Map BASE_INSPECT_DAY_INSERT(
            @RequestParam(value = "V_MAINGUID") String V_MAINGUID,
            @RequestParam(value = "V_EQUCODE") String V_EQUCODE,
            @RequestParam(value = "V_EQUNAME") String V_EQUNAME,
            @RequestParam(value = "V_INSPECT_UNIT_CODE") String V_INSPECT_UNIT_CODE,
            @RequestParam(value = "V_INSPECT_UNIT") String V_INSPECT_UNIT,
            @RequestParam(value = "V_INSPECT_CONTENT") String V_INSPECT_CONTENT,
            @RequestParam(value = "V_INSPECT_STANDARD") String V_INSPECT_STANDARD,
            @RequestParam(value = "V_UUID") String V_UUID,
            @RequestParam(value = "V_PERCODE") String V_PERCODE,
            @RequestParam(value = "V_PERNAME") String V_PERNAME,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
        Map result = dx_fileService.BASE_INSPECT_DAY_INSERT(V_MAINGUID, V_EQUCODE, V_EQUNAME, V_INSPECT_UNIT_CODE, V_INSPECT_UNIT, V_INSPECT_CONTENT, V_INSPECT_STANDARD, V_UUID, V_PERCODE, V_PERNAME);
        return result;
    }


    @RequestMapping(value = "BASE_INSPECT_DAY_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map BASE_INSPECT_DAY_UPDATE(
            @RequestParam(value = "V_MAINGUID") String V_MAINGUID,
            @RequestParam(value = "V_PERCODE") String V_PERCODE,
            @RequestParam(value = "V_UUID") String V_UUID,
            @RequestParam(value = "V_STATE_SIGN") String V_STATE_SIGN,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
        Map result = dx_fileService.BASE_INSPECT_DAY_UPDATE(V_MAINGUID, V_PERCODE, V_UUID, V_STATE_SIGN);
        return result;
    }

    //--获取岗检下一步班组列表
    @RequestMapping(value = "BASE_INSPECT_GETCLASS", method = RequestMethod.POST)
    @ResponseBody
    public Map BASE_INSPECT_GETCLASS(
            @RequestParam(value = "V_PERCODE") String V_PERCODE,
            @RequestParam(value = "DEPTCODE") String DEPTCODE,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
        Map result = dx_fileService.BASE_INSPECT_GETCLASS(V_PERCODE, DEPTCODE);
        return result;
    }

    //-获取下一步人员列表
    @RequestMapping(value = "BASE_INSPECT_GETNEXTPERSON", method = RequestMethod.POST)
    @ResponseBody
    public Map BASE_INSPECT_GETCLASS(
            @RequestParam(value = "SAP_WORK") String SAP_WORK,
            HttpServletResponse response
    ) throws Exception {
        Map result = dx_fileService.BASE_INSPECT_GETNEXTPERSON(SAP_WORK);
        return result;
    }

    //----写入write表格
    @RequestMapping(value = "BASE_INSPECT_WRITE_INSERT", method = RequestMethod.POST)
    @ResponseBody
    public Map BASE_INSPECT_WRITE_INSERT(
            @RequestParam(value = "V_MAINGUID") String V_MAINGUID,
            @RequestParam(value = "V_INPERCODE") String V_INPERCODE,
            @RequestParam(value = "V_NEXTPRECODE") String V_NEXTPRECODE,
            @RequestParam(value = "V_INCLASS") String V_INCLASS,
            @RequestParam(value = "V_NEXTCLASS") String V_NEXTCLASS,
            @RequestParam(value = "V_NCLASSNAME") String V_NCLASSNAME,
            @RequestParam(value = "V_INSPECT_RESULTE") String V_INSPECT_RESULTE,
            @RequestParam(value = "V_REQUESTION") String V_REQUESTION,
            @RequestParam(value = "V_EQUESTION") String V_EQUESTION,
            @RequestParam(value = "V_OTHER_QIUEST") String V_OTHER_QIUEST,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
        Map result = dx_fileService.BASE_INSPECT_WRITE_INSERT(V_MAINGUID, V_INPERCODE, V_NEXTPRECODE, V_INCLASS, V_NEXTCLASS, V_NCLASSNAME, V_INSPECT_RESULTE, V_REQUESTION, V_EQUESTION, V_OTHER_QIUEST);
        return result;
    }
//----修改write表

    @RequestMapping(value = "BASE_INSPECT_WRITE_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map BASE_INSPECT_WRITE_UPDATE(
            @RequestParam(value = "V_MAINGUID") String V_MAINGUID,
            @RequestParam(value = "V_CHILDGUID") String V_CHILDGUID,
            @RequestParam(value = "V_PERCODE") String V_PERCODE,
            @RequestParam(value = "V_NEXT_CLASS") String V_NEXT_CLASS,
            @RequestParam(value = "V_NEXTPERCODE") String V_NEXTPERCODE,
            @RequestParam(value = "V_INSPECT_RESULTE") String V_INSPECT_RESULTE,
            @RequestParam(value = "V_REQUESTION") String V_REQUESTION,
            @RequestParam(value = "V_EQUESTION") String V_EQUESTION,
            @RequestParam(value = "V_OTHER_QIUEST") String V_OTHER_QIUEST,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
        Map result = dx_fileService.BASE_INSPECT_WRITE_UPDATE(V_MAINGUID, V_CHILDGUID, V_PERCODE, V_NEXT_CLASS, V_NEXTPERCODE, V_INSPECT_RESULTE, V_REQUESTION, V_EQUESTION, V_OTHER_QIUEST);
        return result;
    }

    ///--___-查询返回的write表
    @RequestMapping(value = "BASE_INSPECT_WRITE_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map BASE_INSPECT_WRITE_SELECT(
            @RequestParam(value = "V_MAINGUID") String V_MAINGUID,
            @RequestParam(value = "V_CHILDGUID") String V_CHILDGUID,
            @RequestParam(value = "V_PERCODE") String V_PERCODE,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
        Map result = dx_fileService.BASE_INSPECT_WRITE_SELECT(V_MAINGUID, V_CHILDGUID, V_PERCODE);
        return result;
    }

    //---首页日检数量
    @RequestMapping(value = "BASE_INSPECT_WRITE_SELNUM", method = RequestMethod.POST)
    @ResponseBody
    public Map BASE_INSPECT_WRITE_SELNUM(
            @RequestParam(value = "V_PERCODE") String V_PERCODE,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
        Map result = dx_fileService.BASE_INSPECT_WRITE_SELNUM(V_PERCODE);
        return result;
    }
    //---待办日检明细

    @RequestMapping(value = "BASE_INSPECT_SELTODOS", method = RequestMethod.POST)
    @ResponseBody
    public Map BASE_INSPECT_SELTODOS(
            @RequestParam(value = "V_CHILDGUID") String V_CHILDGUID,
            @RequestParam(value = "V_PERSON") String V_PERSON,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
        Map result = dx_fileService.BASE_INSPECT_SELTODOS(V_CHILDGUID, V_PERSON);
        return result;
    }

    @RequestMapping(value = "BASE_INSPECT_WRITE_INSERT2", method = RequestMethod.POST)
    @ResponseBody
    public Map BASE_INSPECT_WRITE_INSERT2(
            @RequestParam(value = "V_MAINGUID") String V_MAINGUID,
            @RequestParam(value = "V_CHILDGUID") String V_CHILDGUID,
            @RequestParam(value = "V_INPERCODE") String V_INPERCODE,
            @RequestParam(value = "V_NEXTPRECODE") String V_NEXTPRECODE,
            @RequestParam(value = "V_INCLASS") String V_INCLASS,
            @RequestParam(value = "V_NEXTCLASS") String V_NEXTCLASS,
            @RequestParam(value = "V_NCLASSNAME") String V_NCLASSNAME,
            @RequestParam(value = "V_INSPECT_RESULTE") String V_INSPECT_RESULTE,
            @RequestParam(value = "V_REQUESTION") String V_REQUESTION,
            @RequestParam(value = "V_EQUESTION") String V_EQUESTION,
            @RequestParam(value = "V_OTHER_QIUEST") String V_OTHER_QIUEST,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
        Map result = dx_fileService.BASE_INSPECT_WRITE_INSERT2(V_MAINGUID, V_CHILDGUID, V_INPERCODE, V_NEXTPRECODE, V_INCLASS, V_NEXTCLASS, V_NCLASSNAME, V_INSPECT_RESULTE, V_REQUESTION, V_EQUESTION, V_OTHER_QIUEST);
        return result;
    }

    //----周计划上报设备部
    @RequestMapping(value = "PRO_PM_03_PLAN_WEEK_SEND2", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_WEEK_SEND2(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = dx_fileService.PRO_PM_03_PLAN_WEEK_SEND2(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_FLOWCODE, V_V_PLANTYPE, V_V_PERSONCODE);
        test.put("list", result);
        return test;
    }

    // plan report to find next person  week/month
    @RequestMapping(value = "PM_ACTIVITI_PROCESS_PER_SELSBB", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_ACTIVITI_PROCESS_PER_SELSBB(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                              @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                              @RequestParam(value = "V_V_REPAIRCODE") String V_V_REPAIRCODE,
                                                              @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
                                                              @RequestParam(value = "V_V_FLOW_STEP") String V_V_FLOW_STEP,
                                                              @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                              @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
                                                              @RequestParam(value = "V_V_WHERE") String V_V_WHERE,
                                                              HttpServletRequest request,
                                                              HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = dx_fileService.PM_ACTIVITI_PROCESS_PER_SELSBB(V_V_ORGCODE, V_V_DEPTCODE, V_V_REPAIRCODE, V_V_FLOWTYPE, V_V_FLOW_STEP, V_V_PERCODE, V_V_SPECIALTY, V_V_WHERE);

        List<Map<String, Object>> list = (List) data.get("list");

        String ret = (String) data.get("RET");
        result.put("RET", ret);
        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //  plan report to sbb select date
    @RequestMapping(value = "PRO_PM_03_PLAN_WEEK_VIEWSBB", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_WEEK_VIEWSBB(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                                           @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                                                           @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
                                                           @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                           @RequestParam(value = "V_V_ZY") String V_V_ZY,
                                                           @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                                           @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                           @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                                                           @RequestParam(value = "V_V_STATE") String V_V_STATE,
                                                           @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                           @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = dx_fileService.PRO_PM_03_PLAN_WEEK_VIEWSBB(V_V_YEAR, V_V_MONTH, V_V_WEEK, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_ZY, V_V_EQUTYPE, V_V_EQUCODE, V_V_CONTENT, V_V_STATE, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    // 上报设备部周计划数据添加
    @RequestMapping(value = "PRO_PM_03_PLAN_WEEK_SENDSBB", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_WEEK_SENDSBB(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_UPSBBPER") String V_UPSBBPER,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = dx_fileService.PRO_PM_03_PLAN_WEEK_SENDSBB(V_V_GUID, V_UPSBBPER);
        test.put("list", result);
        return test;
    }

    // SBB办理绑定周计划数据
    @RequestMapping(value = "PRO_PM_03_PLAN_WEEK_GET2", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_WEEK_GET2(
            @RequestParam(value = "V_V_WEEKPLAN_GUID") String V_V_WEEKPLAN_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = dx_fileService.PRO_PM_03_PLAN_WEEK_GET2(V_V_WEEKPLAN_GUID);

        List<Map<String, Object>> pm_03list = (List) data.get("list");

        result.put("list", pm_03list);
        result.put("success", true);
        return result;
    }

    // 设备部，查询审批中和审批完成的页面
    @RequestMapping(value = "PM_03_PLAN_WEEK_SEL2", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_WEEK_SEL2(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_ZY") String V_V_ZY,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
            @RequestParam(value = "V_V_STATE") String V_V_STATE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = dx_fileService.PM_03_PLAN_WEEK_SEL2(V_V_YEAR, V_V_MONTH, V_V_WEEK, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_ZY, V_V_EQUTYPE, V_V_EQUCODE, V_V_CONTENT, V_V_FLOWTYPE, V_V_STATE, V_V_PAGE, V_V_PAGESIZE);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("total");
        result.put("list", rlist);
        result.put("total", v_info);
        result.put("success", true);
        return result;
    }

    // month report to sbb data
    @RequestMapping(value = "PM_03_MONTH_PLAN_BYPER_SEL2", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_MONTH_PLAN_BYPER_SEL2(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_ZY") String V_V_ZY,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
            @RequestParam(value = "V_V_PEROCDE") String V_V_PEROCDE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = dx_fileService.PM_03_MONTH_PLAN_BYPER_SEL2(V_V_YEAR, V_V_MONTH, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_ZY, V_V_CONTENT, V_V_STATECODE, V_V_PEROCDE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    // month report to sbb data view   PM_03_MONTH_PLAN_SEL2
    @RequestMapping(value = "PM_03_MONTH_PLAN_SEL2", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_MONTH_PLAN_SEL2(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_ZY") String V_V_ZY,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
            @RequestParam(value = "V_V_PEROCDE") String V_V_PEROCDE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = dx_fileService.PM_03_MONTH_PLAN_SEL2(V_V_YEAR, V_V_MONTH, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_ZY, V_V_CONTENT, V_V_STATECODE, V_V_PEROCDE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    //  SBB 月计划办理获取数据
    @RequestMapping(value = "PRO_PM_03_PLAN_MONTH_GET2", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_MONTH_GET2(
            @RequestParam(value = "V_V_MONTHPLAN_GUID") String V_V_MONTHPLAN_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = dx_fileService.PRO_PM_03_PLAN_MONTH_GET2(V_V_MONTHPLAN_GUID);

        List<Map<String, Object>> pm_03list = (List) data.get("list");

        result.put("list", pm_03list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "INSERT_RESTARTPROC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> INSERT_RESTARTPROC() throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        Map<String, Object> ret = dx_fileService.INSERT_RESTARTPROC();

        result.put("list", ret);
        result.put("success", true);
        return result;
    }


    /*
    CREATE BY HRB 2018/11/30
     */
    // 备件使用情况查询
    @RequestMapping(value = "PRO_SPARE_SELECT2", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_SPARE_SELECT2(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
                                                 @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
                                                 @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                 @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                                 @RequestParam(value = "V_EQUTYPE_CODE") String V_EQUTYPE_CODE,
                                                 @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
                                                 @RequestParam(value = "V_V_SPARE") String V_V_SPARE,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = dx_fileService.PRO_SPARE_SELECT2(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_EQUTYPE_CODE, V_EQU_CODE, V_V_SPARE);
        return setPage(request, response, data);
    }

    // 备件使用情况导出
    @RequestMapping(value = "/SPARESEL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void SPARESEL_EXCEL(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
                               @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
                               @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                               @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                               @RequestParam(value = "V_EQUTYPE_CODE") String V_EQUTYPE_CODE,
                               @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
                               @RequestParam(value = "V_V_SPARE") String V_V_SPARE,
                               HttpServletRequest request,
                               HttpServletResponse response)
            throws SQLException {

        String V_V_DEPTNEXTCODE2 = V_V_DEPTNEXTCODE.equals("all") ? "%" : V_V_DEPTNEXTCODE;
        String V_EQUTYPE_CODE2 = V_EQUTYPE_CODE.equals("all") ? "%" : V_EQUTYPE_CODE;
        String V_EQU_CODE2 = V_EQU_CODE.equals("all") ? "%" : V_EQU_CODE;
        String V_V_SPARE2 = V_V_SPARE.equals("all") ? "%" : V_V_SPARE;
        List list = new ArrayList();

        Map<String, Object> data = dx_fileService.PRO_SPARE_SELECT2(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_DEPTCODE, V_V_DEPTNEXTCODE2, V_EQUTYPE_CODE2, V_EQU_CODE2, V_V_SPARE2);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("物料编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("物料名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("规格型号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("物料更换时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("查看相关工单");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("V_MATERIALCODE") == null ? "" : map.get("V_MATERIALCODE").toString());
                row.createCell((short) 2).setCellValue(map.get("V_MATERIALNAME") == null ? "" : map.get("V_MATERIALNAME").toString());
                row.createCell((short) 3).setCellValue(map.get("V_SPEC") == null ? "" : map.get("V_SPEC").toString());
                row.createCell((short) 4).setCellValue(map.get("V_UNIT") == null ? "" : map.get("V_UNIT").toString());
                row.createCell((short) 5).setCellValue(map.get("F_NUMBER") == null ? "" : map.get("F_NUMBER").toString());
                row.createCell((short) 6).setCellValue(map.get("D_FACT_FINISH_DATE") == null ? "" : map.get("D_FACT_FINISH_DATE").toString());
                row.createCell((short) 7).setCellValue(map.get("V_XGGD") == null ? "" : map.get("V_XGGD").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("设备物料消耗Excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    // 备件使用情况工单明细查询
    @RequestMapping(value = "PRO_SPARE_SELECT_WORKORDER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_SPARE_SELECT_WORKORDER(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
                                                          @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
                                                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                          @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                                          @RequestParam(value = "V_EQUTYPE_CODE") String V_EQUTYPE_CODE,
                                                          @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
                                                          @RequestParam(value = "V_V_SPARE") String V_V_SPARE,
                                                          @RequestParam(value = "V_V_SAPRECODE") String V_V_SAPRECODE,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = dx_fileService.PRO_SPARE_SELECT_WORKORDER(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_EQUTYPE_CODE, V_EQU_CODE, V_V_SPARE, V_V_SAPRECODE);
        return setPage(request, response, data);
    }


    // 备件使用情况工单明细导出
    @RequestMapping(value = "/SPARESELWORK_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void SPARESELWORK_EXCEL(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
                                   @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
                                   @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                   @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                   @RequestParam(value = "V_EQUTYPE_CODE") String V_EQUTYPE_CODE,
                                   @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
                                   @RequestParam(value = "V_V_SPARE") String V_V_SPARE,
                                   @RequestParam(value = "V_V_SAPRECODE") String V_V_SAPRECODE,
                                   HttpServletRequest request,
                                   HttpServletResponse response)
            throws SQLException {

        String V_V_DEPTNEXTCODE2 = V_V_DEPTNEXTCODE.equals("all") ? "%" : V_V_DEPTNEXTCODE;
        String V_EQUTYPE_CODE2 = V_EQUTYPE_CODE.equals("all") ? "%" : V_EQUTYPE_CODE;
        String V_EQU_CODE2 = V_EQU_CODE.equals("all") ? "%" : V_EQU_CODE;
        String V_V_SPARE2 = V_V_SPARE.equals("K") ? "%" : V_V_SPARE;
        List list = new ArrayList();

        Map<String, Object> data = dx_fileService.PRO_SPARE_SELECT_WORKORDER(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_DEPTCODE, V_V_DEPTNEXTCODE2, V_EQUTYPE_CODE2, V_EQU_CODE2, V_V_SPARE2, V_V_SAPRECODE);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);
        cell = row.createCell((short) 1);
        cell.setCellValue("工单号");
        cell.setCellStyle(style);
        cell = row.createCell((short) 2);
        cell.setCellValue("工单描述");
        cell.setCellStyle(style);
        cell = row.createCell((short) 3);
        cell.setCellValue("设备位置");
        cell.setCellStyle(style);
        cell = row.createCell((short) 4);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);
        cell = row.createCell((short) 5);
        cell.setCellValue("备件消耗");
        cell.setCellStyle(style);
        cell = row.createCell((short) 6);
        cell.setCellValue("委托单位");
        cell.setCellStyle(style);
        cell = row.createCell((short) 7);
        cell.setCellValue("委托人");
        cell.setCellStyle(style);
        cell = row.createCell((short) 8);
        cell.setCellValue("委托时间");
        cell.setCellStyle(style);
        cell = row.createCell((short) 9);
        cell.setCellValue("实际结束时间");
        cell.setCellStyle(style);
        cell = row.createCell((short) 10);
        cell.setCellValue("检修单位");
        cell.setCellStyle(style);
        cell = row.createCell((short) 11);
        cell.setCellValue("工单类型");
        cell.setCellStyle(style);
        cell = row.createCell((short) 12);
        cell.setCellValue("工单状态");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("V_ORDERID") == null ? "" : map.get("V_ORDERID").toString());
                row.createCell((short) 2).setCellValue(map.get("V_SHORT_TXT") == null ? "" : map.get("V_SHORT_TXT").toString());
                row.createCell((short) 3).setCellValue(map.get("V_EQUSITENAME") == null ? "" : map.get("V_EQUSITENAME").toString());
                row.createCell((short) 4).setCellValue(map.get("V_EQUIP_NAME") == null ? "" : map.get("V_EQUIP_NAME").toString());
                row.createCell((short) 5).setCellValue(map.get("V_SPARE") == null ? "" : map.get("V_SPARE").toString());
                row.createCell((short) 6).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());
                row.createCell((short) 7).setCellValue(map.get("V_PERSONNAME") == null ? "" : map.get("V_PERSONNAME").toString());
                row.createCell((short) 8).setCellValue(map.get("D_ENTER_DATE") == null ? "" : map.get("D_ENTER_DATE").toString());
                row.createCell((short) 9).setCellValue(map.get("D_FACT_FINISH_DATE") == null ? "" : map.get("D_FACT_FINISH_DATE").toString());
                row.createCell((short) 10).setCellValue(map.get("V_DEPTNAMEREPARIR") == null ? "" : map.get("V_DEPTNAMEREPARIR").toString());
                row.createCell((short) 11).setCellValue(map.get("V_ORDER_TYP_TXT") == null ? "" : map.get("V_ORDER_TYP_TXT").toString());
                row.createCell((short) 12).setCellValue(map.get("V_STATENAME") == null ? "" : map.get("V_STATENAME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("备件使用情况工单明细表Excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    //  大修含返回数量的查询机具，物料，工具等数据
    @RequestMapping(value = "PRO_YEAR_PROJECT_MXUSE_SEL2", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_YEAR_PROJECT_MXUSE_SEL(
            @RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
            @RequestParam(value = "V_SDATE") String V_SDATE,
            @RequestParam(value = "V_EDATE") String V_EDATE)
            throws Exception {

        Map result = dx_fileService.PRO_YEAR_PROJECT_MXUSE_SEL2(V_V_PROJECT_GUID, V_V_TYPE, V_SDATE, V_EDATE);
        return result;
    }

    // 大修返回工单明细
    @RequestMapping(value = "PRO_YEAR_PROJECT_WORKORDER_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_YEAR_PROJECT_WORKORDER_SEL(
            @RequestParam(value = "V_V_PROJECTGUID") String V_V_PROJECTGUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = dx_fileService.PRO_YEAR_PROJECT_WORKORDER_SEL(V_V_PROJECTGUID);
        return result;
    }

    // 大修返回缺陷明细
    @RequestMapping(value = "PRO_YEAR_PROJECT_DEFECT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_YEAR_PROJECT_DEFECT_SEL(
            @RequestParam(value = "V_V_PROJECTGUID") String V_V_PROJECTGUID,
            @RequestParam(value = "V_SDATE") String V_SDATE,
            @RequestParam(value = "V_EDATE") String V_EDATE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = dx_fileService.PRO_YEAR_PROJECT_DEFECT_SEL(V_V_PROJECTGUID, V_SDATE, V_EDATE);
        return result;
    }

    // 周计划按人员查询作业区全部
    @RequestMapping(value = "PRO_PM_03_PLAN_WEEK_VIEW2", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_WEEK_VIEW2(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                                         @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                                                         @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
                                                         @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                         @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                         @RequestParam(value = "V_V_ZY") String V_V_ZY,
                                                         @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                                         @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                         @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                                                         @RequestParam(value = "V_V_STATE") String V_V_STATE,
                                                         @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                         @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                                         @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                         @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = dx_fileService.PRO_PM_03_PLAN_WEEK_VIEW2(V_V_YEAR, V_V_MONTH, V_V_WEEK, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_ZY, V_V_EQUTYPE, V_V_EQUCODE, V_V_CONTENT, V_V_STATE, V_V_PERSONCODE, V_V_DEPTTYPE, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    // 设备部驳回修改
    @RequestMapping(value = "PRO_PM_03_PLAN_WEEK_NSETSBB", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_WEEK_NSETSBB(
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_WEEK") String V_V_WEEK,

            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,

            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STARTTIME") String V_V_STARTTIME,
            @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
            @RequestParam(value = "V_V_OTHERPLAN_GUID") String V_V_OTHERPLAN_GUID,
            @RequestParam(value = "V_V_OTHERPLAN_TYPE") String V_V_OTHERPLAN_TYPE,

            @RequestParam(value = "V_V_JHMX_GUID") String V_V_JHMX_GUID,
            @RequestParam(value = "V_V_HOUR") String V_V_HOUR,
            @RequestParam(value = "V_V_BZ") String V_V_BZ,
            @RequestParam(value = "V_V_DEFECTGUID") String V_V_DEFECTGUID,
            @RequestParam(value = "V_V_MAIN_DEFECT") String V_V_MAIN_DEFECT,
            @RequestParam(value = "V_V_EXPECT_AGE") String V_V_EXPECT_AGE,
            @RequestParam(value = "V_V_REPAIR_PER") String V_V_REPAIR_PER,

            @RequestParam(value = "V_V_PDC") String V_V_PDC,
            @RequestParam(value = "V_V_GYYQ") String V_V_GYYQ,
            @RequestParam(value = "V_V_CHANGPDC") String V_V_CHANGPDC,
            @RequestParam(value = "V_V_JXHOUR") String V_V_JXHOUR,
            @RequestParam(value = "V_V_JJHOUR") String V_V_JJHOUR,
            @RequestParam(value = "V_V_TELNAME") String V_V_TELNAME,
            @RequestParam(value = "V_V_TELNUMB") String V_V_TELNUMB,
            @RequestParam(value = "V_V_PDGG") String V_V_PDGG,
            @RequestParam(value = "V_V_THICKNESS") String V_V_THICKNESS,
            @RequestParam(value = "V_V_REASON") String V_V_REASON,
            @RequestParam(value = "V_V_EVERTIME") String V_V_EVERTIME,
            @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
            @RequestParam(value = "V_V_RDEPATCODE") String V_V_RDEPATCODE,
            @RequestParam(value = "V_V_RDEPATNAME") String V_V_RDEPATNAME,
            @RequestParam(value = "V_V_SGWAY") String V_V_SGWAY,
            @RequestParam(value = "V_V_SGWAYNAME") String V_V_SGWAYNAME,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = dx_fileService.PRO_PM_03_PLAN_WEEK_NSETSBB(
                V_V_INPER,
                V_V_GUID,
                V_V_YEAR,
                V_V_MONTH,
                V_V_WEEK,

                V_V_ORGCODE,
                V_V_DEPTCODE,
                V_V_EQUTYPECODE,
                V_V_EQUCODE,
                V_V_REPAIRMAJOR_CODE,

                V_V_CONTENT,
                V_V_STARTTIME,
                V_V_ENDTIME,
                V_V_OTHERPLAN_GUID,
                V_V_OTHERPLAN_TYPE,

                V_V_JHMX_GUID,
                V_V_HOUR,
                V_V_BZ,
                V_V_DEFECTGUID,
                V_V_MAIN_DEFECT,
                V_V_EXPECT_AGE,
                V_V_REPAIR_PER
                , V_V_PDC,
                V_V_GYYQ,
                V_V_CHANGPDC,
                V_V_JXHOUR,
                V_V_JJHOUR,
                V_V_TELNAME,
                V_V_TELNUMB,
                V_V_PDGG, V_V_THICKNESS, V_V_REASON, V_V_EVERTIME,
                V_V_FLAG,
                V_V_RDEPATCODE,
                V_V_RDEPATNAME,
                V_V_SGWAY,
                V_V_SGWAYNAME);

        return result;
    }

    // 设备部月计划驳回修改保存
    @RequestMapping(value = "PRO_PM_03_PLAN_MONTH_SETSBB", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_MONTH_SETSBB(
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STARTTIME") String V_V_STARTTIME,
            @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
            @RequestParam(value = "V_V_OTHERPLAN_GUID") String V_V_OTHERPLAN_GUID,
            @RequestParam(value = "V_V_OTHERPLAN_TYPE") String V_V_OTHERPLAN_TYPE,
            @RequestParam(value = "V_V_JHMX_GUID") String V_V_JHMX_GUID,
            @RequestParam(value = "V_V_HOUR") String V_V_HOUR,
            @RequestParam(value = "V_V_BZ") String V_V_BZ,
            @RequestParam(value = "V_V_MAIN_DEFECT") String V_V_MAIN_DEFECT,
            @RequestParam(value = "V_V_EXPECT_AGE") String V_V_EXPECT_AGE,
            @RequestParam(value = "V_V_REPAIR_PER") String V_V_REPAIR_PER,
            //2018-11-21
            @RequestParam(value = "V_V_SGWAY") String V_V_SGWAY,
            @RequestParam(value = "V_V_SGWAYNAME") String V_V_SGWAYNAME,
            @RequestParam(value = "V_V_FLAG") String V_V_FLAG,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = dx_fileService.PRO_PM_03_PLAN_MONTH_SETSBB(
                V_V_INPER,
                V_V_GUID,
                V_V_YEAR,
                V_V_MONTH,
                V_V_ORGCODE,
                V_V_DEPTCODE,
                V_V_EQUTYPECODE,
                V_V_EQUCODE,
                V_V_REPAIRMAJOR_CODE,
                V_V_CONTENT,
                V_V_STARTTIME,
                V_V_ENDTIME,
                V_V_OTHERPLAN_GUID,
                V_V_OTHERPLAN_TYPE,
                V_V_JHMX_GUID,
                V_V_HOUR,
                V_V_BZ,
                V_V_MAIN_DEFECT,
                V_V_EXPECT_AGE,
                V_V_REPAIR_PER,
                V_V_SGWAY,
                V_V_SGWAYNAME,
                V_V_FLAG);
        return result;
    }

    // 大修生成工单查询
    @RequestMapping(value = "PM_PROJECT_WORKORDER_CREATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_PROJECT_WORKORDER_CREATE(
            @RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
            @RequestParam(value = "V_V_INPERCODE") String V_V_INPERCODE,
            HttpServletResponse response,
            HttpServletRequest request)
            throws SQLException {
        Map result = dx_fileService.PM_PROJECT_WORKORDER_CREATE(V_V_PROJECT_GUID, V_V_INPERCODE);
        return result;
    }

    @RequestMapping(value = "PM_1917_JXMX_DATA_SEL_WORKDESC", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXMX_DATA_SEL_WORKDESC(@RequestParam(value = "V_V_MX_CODE") String V_V_MX_CODE)
            throws SQLException {
        Map result = dx_fileService.PM_1917_JXMX_DATA_SEL_WORKDESC(V_V_MX_CODE);
        return result;
    }

    @RequestMapping(value = "PRO_YEAR_PROJECT_SEL_WORK", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_YEAR_PROJECT_SEL_WORK(@RequestParam(value = "DX_GUID") String DX_GUID,
                                         @RequestParam(value = "STARTTIME") String STARTTIME,
                                         @RequestParam(value = "ENDTIME") String ENDTIME)
            throws SQLException {
        Map result = dx_fileService.PRO_YEAR_PROJECT_SEL_WORK(DX_GUID, STARTTIME, ENDTIME);
        return result;
    }

    // 大修工单施工方--工单所有检修单位
    @RequestMapping(value = "PRO_YEAR_PROJECT_REDEPT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_YEAR_PROJECT_REDEPT_SEL(
            @RequestParam(value = "V_V_PROJECTGUID") String V_V_PROJECTGUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = dx_fileService.PRO_YEAR_PROJECT_REDEPT_SEL(V_V_PROJECTGUID);
        return result;
    }

    //大修施工方
    @RequestMapping(value = "PM_03_PLAN_REPAIR_DEPT_SEL2", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_REPAIR_DEPT_SEL2(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = dx_fileService.PM_03_PLAN_REPAIR_DEPT_SEL2(V_V_GUID);
        return result;
    }

    //-大修 查询物资消耗
//    @RequestMapping(value = "PRO_YEAR_PROJECT_SEL_WORKGUID", method = RequestMethod.POST)
//    @ResponseBody
//    public Map PRO_YEAR_PROJECT_SEL_WORKGUID(
//            @RequestParam(value = "V_V_GUID") String V_V_GUID,
//            @RequestParam(value = "STARTTIME") String STARTTIME,
//            @RequestParam(value = "ENDTIME") String ENDTIME,
//            HttpServletRequest request,
//            HttpServletResponse response) throws Exception {
//        Map result = dx_fileService.PRO_YEAR_PROJECT_SEL_WORKGUID(V_V_GUID,STARTTIME,ENDTIME);
//        return result;
//    }
    @RequestMapping(value = "PRO_YEAR_PROJECT_SEL_WH", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_YEAR_PROJECT_SEL_WH(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "STARTTIME") String STARTTIME,
            @RequestParam(value = "ENDTIME") String ENDTIME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = new HashMap();
        List listList = new ArrayList();
        List<Map> ret = new ArrayList<Map>();
        Map<String, Object> getguid = dx_fileService.PRO_YEAR_PROJECT_SEL_WORKGUID(V_V_GUID, STARTTIME, ENDTIME);

        try {
            if (!getguid.isEmpty()) {
                listList = (List) getguid.get("list");
                Map Mdate = new HashMap();
                for (int i = 0; i < getguid.size(); i++) {
                    Map map = (Map) listList.get(i);

                    Client client = new Client(new URL(MMEquurl));
                    Object[] results = client.invoke("getBillMaterialByOrder", new Object[]{map.get("V_ORDERGUID")});
                    Document doc = DocumentHelper.parseText(results[0].toString());
                    Element rootElt = doc.getRootElement();
                    Iterator iter = rootElt.elementIterator("Bill");
                    List<Map> list = new ArrayList<Map>();

                    while (iter.hasNext()) {
                        Element recordEle = (Element) iter.next();
                        Mdate.put("orderguid", map.get("V_ORDERGUID"));
                        Mdate.put("billcode", recordEle.elementTextTrim("billcode"));
                        Mdate.put("vch_sparepart_code", recordEle.elementTextTrim("vch_sparepart_code"));
                        Mdate.put("vch_sparepart_name", recordEle.elementTextTrim("vch_sparepart_name"));
                        Mdate.put("vch_type", recordEle.elementTextTrim("vch_type"));
                        Mdate.put("vch_unit", recordEle.elementTextTrim("vch_unit"));
                        Mdate.put("price", recordEle.elementTextTrim("price"));
                        Mdate.put("f_number", recordEle.elementTextTrim("f_number"));
                        Mdate.put("BillType", recordEle.elementTextTrim("BillType"));
                        ret.add(Mdate);
                    }
                }
            }
            result.put("ret", ret);
        } catch (MalformedURLException e) {
            result.put("ret", "Fail");
            e.printStackTrace();
        } catch (Exception e) {
            result.put("ret", "Fail");
            e.printStackTrace();
        }
        return result;
    }

    // 月计划厂矿执行率
    @RequestMapping(value = "PM_03_MONTH_PLAN_CKSTAT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_MONTH_PLAN_CKSTAT_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = dx_fileService.PM_03_MONTH_PLAN_CKSTAT_SEL(V_V_YEAR, V_V_MONTH, V_V_ORGCODE);
        return result;
    }

    @RequestMapping(value = "CK_MONTH_STATE_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void CK_MONTH_STATE_EXCEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws SQLException {

        String V_ORGCODE = V_V_ORGCODE.equals("0") ? "%" : V_V_ORGCODE;
        List list = new ArrayList();

        Map<String, Object> data = dx_fileService.PM_03_MONTH_PLAN_CKSTAT_SEL(V_V_YEAR, V_V_MONTH, V_ORGCODE);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("总数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("执行数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("执行率（%）");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());
                row.createCell((short) 2).setCellValue(map.get("ALLNUM") == null ? "" : map.get("ALLNUM").toString());
                row.createCell((short) 3).setCellValue(map.get("EXENUM") == null ? "" : map.get("EXENUM").toString());
                row.createCell((short) 4).setCellValue(map.get("EXTRATE") == null ? "" : map.get("EXTRATE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("月计划厂矿执行率Excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    // 周计划厂矿执行率
    @RequestMapping(value = "PM_03_WEEK_PLAN_CKSTAT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_WEEK_PLAN_CKSTAT_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = dx_fileService.PM_03_WEEK_PLAN_CKSTAT_SEL(V_V_YEAR, V_V_MONTH, V_V_WEEK, V_V_ORGCODE);
        return result;
    }

    @RequestMapping(value = "CK_WEEK_STATE_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void CK_WEEK_STATE_EXCEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws SQLException {

        String V_ORGCODE = V_V_ORGCODE.equals("0") ? "%" : V_V_ORGCODE;
        List list = new ArrayList();

        Map<String, Object> data = dx_fileService.PM_03_WEEK_PLAN_CKSTAT_SEL(V_V_YEAR, V_V_MONTH, V_V_WEEK, V_ORGCODE);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("总数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("执行数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("执行率（%）");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());
                row.createCell((short) 2).setCellValue(map.get("ALLNUM") == null ? "" : map.get("ALLNUM").toString());
                row.createCell((short) 3).setCellValue(map.get("EXENUM") == null ? "" : map.get("EXENUM").toString());
                row.createCell((short) 4).setCellValue(map.get("EXTRATE") == null ? "" : map.get("EXTRATE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("周计划厂矿执行率Excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


    // 月计划作业区执行率
    @RequestMapping(value = "PM_03_MONTH_PLAN_ZYQSTAT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_MONTH_PLAN_ZYQSTAT_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = dx_fileService.PM_03_MONTH_PLAN_ZYQSTAT_SEL(V_V_YEAR, V_V_MONTH, V_V_ORGCODE);
        return result;
    }

    // 周计划作业区执行率
    @RequestMapping(value = "PM_03_WEEK_PLAN_ZYQSTAT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_WEEK_PLAN_ZYQSTAT_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        HashMap data = dx_fileService.PM_03_WEEK_PLAN_ZYQSTAT_SEL(V_V_YEAR, V_V_MONTH, V_V_WEEK, V_V_ORGCODE);
        return setPage(request, response, data);
    }

    @RequestMapping(value = "ZYQ_MONTH_STATE_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void ZYQ_MONTH_STATE_EXCEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws SQLException {

        String V_ORGCODE = V_V_ORGCODE.equals("0") ? "" : V_V_ORGCODE;
        List list = new ArrayList();

        Map<String, Object> data = dx_fileService.PM_03_MONTH_PLAN_ZYQSTAT_SEL(V_V_YEAR, V_V_MONTH, V_ORGCODE);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("总数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("执行数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("执行率（%）");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());
                row.createCell((short) 2).setCellValue(map.get("ALLNUM") == null ? "" : map.get("ALLNUM").toString());
                row.createCell((short) 3).setCellValue(map.get("EXENUM") == null ? "" : map.get("EXENUM").toString());
                row.createCell((short) 4).setCellValue(map.get("EXTRATE") == null ? "" : map.get("EXTRATE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("月计划作业区执行率Excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "ZYQ_WEEK_STATE_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void ZYQ_WEEK_STATE_EXCEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws SQLException {

        String V_ORGCODE = V_V_ORGCODE.equals("0") ? "" : V_V_ORGCODE;
        List list = new ArrayList();

        Map<String, Object> data = dx_fileService.PM_03_WEEK_PLAN_ZYQSTAT_SEL(V_V_YEAR, V_V_MONTH, V_V_WEEK, V_ORGCODE);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("总数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("执行数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("执行率（%）");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());
                row.createCell((short) 2).setCellValue(map.get("V_ALLNUM") == null ? "" : map.get("V_ALLNUM").toString());
                row.createCell((short) 3).setCellValue(map.get("V_EXENUM") == null ? "" : map.get("V_EXENUM").toString());
                row.createCell((short) 4).setCellValue(map.get("V_EXTRATE") == null ? "" : map.get("V_EXTRATE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("周计划作业区执行率Excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


    @RequestMapping(value = "PRO_PM_DEPT_SORT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_DEPT_SORT(
            @RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
            @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map data = dx_fileService.PRO_PM_DEPT_SORT(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE);
        return data;
    }
    // 计划模型修改
    @RequestMapping(value = "PM_1921_PLAN_MX_DATA_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1921_PLAN_MX_DATA_UPDATE(
            @RequestParam(value = "V_V_MX_CODE") String V_V_MX_CODE,
            @RequestParam(value = "V_V_PERNUM") String V_V_PERNUM,
            @RequestParam(value = "V_V_LIFELONG") String V_V_LIFELONG,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map data = dx_fileService.PM_1921_PLAN_MX_DATA_UPDATE(V_V_MX_CODE, V_V_PERNUM, V_V_LIFELONG);
        return data;
    }

    @RequestMapping(value = "/setPage", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> setPage(HttpServletRequest req, HttpServletResponse resp, HashMap data) {
        if (data == null) {
            return data;
        }
        Map<String, Object> result = new HashMap<String, Object>();
        resp.setContentType("text/plain");
        Integer start = Integer.parseInt(req.getParameter("start"));
        Integer limit = Integer.parseInt(req.getParameter("limit"));
        Page page = new Page();
        page.setStart(start);
        page.setlimit(limit);
        List list = (List) data.get("list");
        List temp = new ArrayList();
        int total = list.size();
        int end = start + limit > total ? total : start + limit;
        for (int i = start; i < end; i++) {
            temp.add(list.get(i));
        }
        result.put("list", temp);
        result.put("total", total);
        result.put("success", true);
        return result;
    }

    public class Page {
        private int start;
        private int limit;

        public int getStart() {
            return start;
        }

        public void setStart(int start) {
            this.start = start;
        }

        public int getLimit() {
            return limit;
        }

        public void setlimit(int limit) {
            this.limit = limit;
        }

        public Integer getPage() {
            return (start / limit) + 1;
        }

    }

}
