package org.building.pm.controller;

import org.building.pm.service.No4120Service;
import org.building.pm.service.PM_01Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 17-4-23.
 */
@Controller
@RequestMapping("/app/pm/No4120")
public class No4120Controller {

    @Autowired
    private No4120Service no4120Service;

    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW_ROLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_VIEW_ROLE(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                       @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                       @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = no4120Service.PRO_BASE_DEPT_VIEW_ROLE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_DEPTTYPE);

        List<Map<String, Object>> no4120list = (List) data.get("list");

        result.put("list", no4120list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_REPAIRDEPT_TODEPT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_REPAIRDEPT_TODEPT(@RequestParam(value = "V_REPAIRDEPTCODE") String V_REPAIRDEPTCODE,
                                                        @RequestParam(value = "V_PERSONCODE") String V_PERSONCODE,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = no4120Service.PRO_PM_REPAIRDEPT_TODEPT(V_REPAIRDEPTCODE, V_PERSONCODE);

        List<Map<String, Object>> no4120list = (List) data.get("list");

        result.put("list", no4120list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_LIST_REPAIR", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_LIST_REPAIR(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                            @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                            @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = no4120Service.PRO_PM_WORKORDER_LIST_REPAIR(V_V_PERSONCODE, V_V_ORGCODE, V_V_DEPTCODE, V_V_DEPTCODEREPARIR, V_V_STATECODE, V_V_SHORT_TXT);

        List<Map<String, Object>> no4120list = (List) data.get("list");

        result.put("list", no4120list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_JS_REPAIRDEPT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_JS_REPAIRDEPT(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                              @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = no4120Service.PRO_PM_WORKORDER_JS_REPAIRDEPT(V_V_PERSONCODE, V_V_ORDERGUID);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_LIST_Re_back", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_LIST_Re_back(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                             @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                             @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                             @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                             @RequestParam(value = "V_DJ_PERCODE") String V_DJ_PERCODE,
                                                             @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = no4120Service.PRO_PM_WORKORDER_LIST_Re_back(V_V_PERSONCODE, V_V_ORGCODE, V_V_DEPTCODE, V_V_DEPTCODEREPARIR, V_V_STATECODE, V_DJ_PERCODE, V_V_SHORT_TXT);

        List<Map<String, Object>> no4120list = (List) data.get("list");

        result.put("list", no4120list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_PERSON_VIEW_ROLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_PERSON_VIEW_ROLE(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                         @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                         @RequestParam(value = "V_V_ROLE") String V_V_ROLE,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = no4120Service.PRO_BASE_PERSON_VIEW_ROLE(V_V_DEPTCODE, V_V_PERSONCODE, V_V_ROLE);

        List<Map<String, Object>> no4120list = (List) data.get("list");

        result.put("list", no4120list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_SP", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_SP(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                         @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                         @RequestParam(value = "V_V_STEPNAME") String V_V_STEPNAME,
                                                         @RequestParam(value = "V_V_MEMO") String V_V_MEMO,
                                                         @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = no4120Service.PRO_PM_WORKORDER_SP(V_V_PERSONCODE, V_V_ORDERGUID, V_V_STEPNAME,V_V_MEMO,V_V_STATECODE);

        List<Map<String, Object>> no4120list = (List) data.get("list");

        result.put("list", no4120list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/VIEW_PRELOADWARE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> VIEW_PRELOADWARE(@RequestParam(value = "X_MODELNUMBER") String X_MODELNUMBER,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = no4120Service.VIEW_PRELOADWARE(X_MODELNUMBER);

        List<Map<String, Object>> mainlist = (List) data.get("mainlist");
        List<Map<String, Object>> comlist = (List) data.get("comlist");
        result.put("mainlist", mainlist);
        result.put("comlist", comlist);
        result.put("success", true);
        return result;
    }

//    @RequestMapping(value = "/DELETE_PRELOADWARE", method = RequestMethod.POST)
//    @ResponseBody
//    public Map<String, Object> DELETE_PRELOADWARE(@RequestParam(value = "X_MODELNUMBER") String X_MODELNUMBER,
//                                                   HttpServletRequest request,
//                                                   HttpServletResponse response) throws Exception {
//        Map<String, Object> result = new HashMap<String, Object>();
//
//        HashMap data = no4120Service.DELETE_PRELOADWARE(X_MODELNUMBER);
//
//        List<Map<String, Object>> no4120list = (List) data.get("list");
//
//        result.put("list", no4120list);
//        result.put("success", true);
//        return result;
//    }

    @RequestMapping(value = "/DELETE_PRELOADWARE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> DELETE_PRELOADWARE(@RequestParam(value = "X_MODELNUMBER") String X_MODELNUMBER
                                                  ) throws Exception {
        Map<String, Object> result =no4120Service.DELETE_PRELOADWARE(X_MODELNUMBER);
        return result;
    }

    @RequestMapping(value = "/ADD_PRELOADWARE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> ADD_PRELOADWARE(@RequestParam(value = "X_MODELNUMBER") String X_MODELNUMBER,
                                               @RequestParam(value = "X_MODELNAME") String X_MODELNAME,
                                               @RequestParam(value = "X_UNIT") String X_UNIT,
                                               @RequestParam(value = "X_TYPE") String X_TYPE,
                                               @RequestParam(value = "X_SETSITE") String X_SETSITE,
                                               @RequestParam(value = "X_MEMO") String X_MEMO,
                                               @RequestParam(value = "X_DRAWING") String X_DRAWING,
                                               @RequestParam(value = "X_EQUTYPECODE") String X_EQUTYPECODE,
                                               @RequestParam(value = "X_DEPTCODE") String X_DEPTCODE,
                                               @RequestParam(value = "X_SPAREPARTS") String X_SPAREPARTS,
                                               @RequestParam(value = "X_YBJCODE") String X_YBJCODE,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = no4120Service.ADD_PRELOADWARE(X_MODELNUMBER,X_MODELNAME,X_UNIT,X_TYPE,X_SETSITE,
                X_MEMO,X_DRAWING,X_EQUTYPECODE,X_DEPTCODE,X_SPAREPARTS,X_YBJCODE);

        List<Map<String, Object>> no4120list = (List) data.get("list");

        result.put("list", no4120list);
        result.put("success", true);
        return result;
    }

    /*上传*/
    @RequestMapping(value = "/uploadImageFile", method = RequestMethod.POST)
    @ResponseBody
    public Map uploadImageFile(@RequestParam(value = "upload") MultipartFile upload,
                               HttpServletRequest request,
                               HttpServletResponse response, ModelMap model) throws Exception {

        String filename = upload.getOriginalFilename();
        String path = request.getSession().getServletContext().getRealPath("upload");
        int length=(int)upload.getSize();
        File targetFile = new File(path, filename);
        if(!targetFile.exists()){
            System.out.println(targetFile);
            targetFile.mkdirs();
        }
        //保存
        try {
            upload.transferTo(targetFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("fileUrl", request.getContextPath()+"/upload/"+filename);
        FileInputStream fis =  new FileInputStream(path+"/"+filename);
        //Map result=no4120Service.pro_run7111_addlog(bjcode, checktime, checkcount, fis,filename, usercode, uesrname,tagid,siteid,tagdesc);
        Map result=new HashMap();
        result.put("success",true);
        return result;
    }

    @RequestMapping(value = "/GEN_PRELOADWARECODEPRO", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GEN_PRELOADWARECODEPRO(
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = no4120Service.GEN_PRELOADWARECODEPRO();

        String no4120list =  data.get("list").toString();

        result.put("list", no4120list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/RRO_BASE_PRELOADWAREMODEL_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> RRO_BASE_PRELOADWAREMODEL_VIEW(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                         @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = no4120Service.RRO_BASE_PRELOADWAREMODEL_VIEW(V_V_DEPTCODE, V_V_EQUTYPECODE);

        List<Map<String, Object>> no4120list = (List) data.get("list");

        result.put("list", no4120list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_YZJ_CREATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_YZJ_CREATE(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                              @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                           @RequestParam(value = "V_V_MODELNUMBER") String V_V_MODELNUMBER,
                                                              HttpServletRequest request,
                                                              HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = no4120Service.PRO_PM_WORKORDER_YZJ_CREATE(V_V_PERCODE, V_V_PERNAME,V_V_MODELNUMBER);

        List<Map<String, Object>> no4120list = (List) data.get("list");

        result.put("list", no4120list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_YZJ_SAVE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_YZJ_SAVE(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                      @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                      @RequestParam(value = "V_V_MODELNUMBER") String V_V_MODELNUMBER,
                                                      @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                      @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                      @RequestParam(value = "V_V_DEPTCODEREPAIR") String V_V_DEPTCODEREPAIR,
                                                      @RequestParam(value = "V_D_START_DATE") String V_D_START_DATE,
                                                      @RequestParam(value = "V_D_FINISH_DATE") String V_D_FINISH_DATE,
                                                      @RequestParam(value = "V_V_WBS") String V_V_WBS,
                                                      @RequestParam(value = "V_V_WBS_TXT") String V_V_WBS_TXT,
                                                      @RequestParam(value = "V_V_TOOL") String V_V_TOOL,
                                                      @RequestParam(value = "V_V_TECHNOLOGY") String V_V_TECHNOLOGY,
                                                      @RequestParam(value = "V_V_SAFE") String V_V_SAFE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = no4120Service.PRO_PM_WORKORDER_YZJ_SAVE(V_V_PERCODE,V_V_PERNAME,V_V_MODELNUMBER,V_V_ORDERGUID,V_V_SHORT_TXT,
                V_V_DEPTCODEREPAIR,V_D_START_DATE,V_D_FINISH_DATE,V_V_WBS,V_V_WBS_TXT,V_V_TOOL,V_V_TECHNOLOGY,V_V_SAFE);

        String no4120list =  data.get("list").toString();

        result.put("list", no4120list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_PRELOADWARE_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_PRELOADWARE_VIEW(
                                                      @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                      @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                      @RequestParam(value = "V_V_STATUS") String V_V_STATUS,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = no4120Service.PRO_PM_PRELOADWARE_VIEW(V_V_DEPTCODE, V_V_EQUTYPECODE, V_V_STATUS);

        List<Map<String, Object>> no4120list = (List) data.get("list");

        result.put("list", no4120list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/SAP_PM_EQU_P_IMPORT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SAP_PM_EQU_P_IMPORT_SEL(
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = no4120Service.SAP_PM_EQU_P_IMPORT_SEL(V_V_PERCODE, V_V_EQUTYPE);

        List<Map<String, Object>> no4120list = (List) data.get("list");

        result.put("list", no4120list);
        result.put("success", true);
        return result;
    }
}



