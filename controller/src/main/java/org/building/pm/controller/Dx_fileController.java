package org.building.pm.controller;

import javafx.application.Application;
import org.activiti.bpmn.converter.CallActivityXMLConverter;
import org.building.pm.service.Dx_fileService;
import org.building.pm.webpublic.MasageClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.ExtensionInstallationException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.filechooser.FileSystemView;
import java.io.*;
import java.net.URLDecoder;
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
    @RequestMapping(value = "/PRO_PM_03_PLAN_WEEK_GET2", method = RequestMethod.POST)
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

        HashMap data = dx_fileService.PM_03_PLAN_WEEK_SEL2(V_V_YEAR, V_V_MONTH, V_V_WEEK,V_V_ORGCODE,V_V_DEPTCODE,
                V_V_ZY, V_V_EQUTYPE, V_V_EQUCODE, V_V_CONTENT, V_V_FLOWTYPE, V_V_STATE, V_V_PAGE, V_V_PAGESIZE);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("total");
        result.put("list", rlist);
        result.put("total", v_info);
        result.put("success", true);
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
