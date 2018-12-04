package org.building.pm.controller;

import javafx.application.Application;
import org.activiti.bpmn.converter.CallActivityXMLConverter;
import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.Dx_fileService;
import org.building.pm.webpublic.MasageClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.ExtensionInstallationException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.filechooser.FileSystemView;
import java.io.*;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/app/pm/dxfile/")
public class Dx_fileController {
    @Autowired
    private Dx_fileService dx_fileService;

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
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE) throws Exception {

        Map result = dx_fileService.PRO_YEAR_PROJECT_MXUSE_SEL2(V_V_PROJECT_GUID, V_V_TYPE);
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
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = dx_fileService.PRO_YEAR_PROJECT_DEFECT_SEL(V_V_PROJECTGUID);
        return result;
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
