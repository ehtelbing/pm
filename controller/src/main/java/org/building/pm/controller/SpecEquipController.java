package org.building.pm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.util.Region;
import org.building.pm.service.HpService;
import org.building.pm.service.SpecEquipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2019-12-17.
 * <p>
 * 特种设备controller
 */
@Controller
@RequestMapping("/app/pm/specEquip")
public class SpecEquipController {

    @Value("#{configProperties['PM_JST']}")
    private String pm_jst;

    @Autowired
    private SpecEquipService specEquipService;

    //计划申请查询
    @RequestMapping(value = "/selectPlanApply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectPlanApply(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                               @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                               @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                               @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                               @RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                               @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                               @RequestParam(value = "V_V_BDATE") String V_V_BDATE,
                                               @RequestParam(value = "V_V_EDATE") String V_V_EDATE,
                                               @RequestParam(value = "V_V_STATUS") String V_V_STATUS,
                                               Integer page,
                                               Integer limit,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map result = specEquipService.selectPlanApply(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUTYPENAME, V_V_EQUCODE, V_V_BDATE, V_V_EDATE, V_V_STATUS, page.toString(), limit.toString());
        return result;
    }

    //计划申请新增
    @RequestMapping(value = "/insertPlanApply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> insertPlanApply(@RequestParam(value = "I_I_ID") String I_I_ID,
                                               @RequestParam(value = "V_V_ORGNAME") String V_V_ORGNAME,
                                               @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                               @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
                                               @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                               @RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                               @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                               @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                               @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                               @RequestParam(value = "V_V_CHECKTIME") String V_V_CHECKTIME,
                                               @RequestParam(value = "V_V_CHECKPART") String V_V_CHECKPART,
                                               @RequestParam(value = "V_V_CHECKDEPT") String V_V_CHECKDEPT,
                                               @RequestParam(value = "V_V_COST") String V_V_COST,
                                               @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map result = specEquipService.insertPlanApply(I_I_ID, V_V_ORGNAME, V_V_ORGCODE, V_V_DEPTNAME, V_V_DEPTCODE, V_V_EQUTYPENAME, V_V_EQUTYPECODE, V_V_EQUNAME, V_V_EQUCODE, V_V_CHECKTIME, V_V_CHECKPART, V_V_CHECKDEPT, V_V_COST, V_V_PERSONCODE);
        return result;
    }

    //根据计划申请的主键查询
    @RequestMapping(value = "/loadPlanApply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> loadPlanApply(
            @RequestParam(value = "I_I_ID") String I_I_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = specEquipService.loadPlanApply(I_I_ID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);

        return data;
    }

    //计划申请删除
    @RequestMapping(value = "/deletePlanApply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deletePlanApply(@RequestParam(value = "I_I_ID", required = false) String I_I_ID,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = specEquipService.deletePlanApply(I_I_ID);

        result.put("V_INFO", (String) data.get("V_INFO"));
        result.put("success", true);

        return result;
    }

    //导出检定计划查询申请
    @RequestMapping(value = "/excelPlanApply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> excelPlanApply(@RequestParam(value = "I_I_ID_LIST", required = false) List<String> I_I_ID_LIST,
                                              String V_V_PERSONCODE,
                                              String V_V_DEPTCODE,
                                              String V_V_DEPTCODENEXT,
                                              String V_V_EQUTYPECODE,
                                              String V_V_EQUTYPENAME,
                                              String V_V_EQUCODE,
                                              String V_V_BDATE,
                                              String V_V_EDATE,
                                              String V_V_STATUS,
                                              Integer page,
                                              Integer limit,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        specEquipService.excelPlanApply(I_I_ID_LIST, V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUTYPENAME, V_V_EQUCODE, V_V_BDATE, V_V_EDATE, V_V_STATUS, page.toString(), limit.toString());
        return null;
    }
}
