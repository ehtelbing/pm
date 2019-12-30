package org.building.pm.controller;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.building.pm.base.BaseUtils;
import org.building.pm.service.OilService;
import org.building.pm.service.SpecEquipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2019-12-17.
 * <p>
 * 润滑油脂controller
 */
@Controller
@RequestMapping("/app/pm/oil")
public class OilController {

    @Value("#{configProperties['PM_JST']}")
    private String pm_jst;

    @Autowired
    private OilService oilService;

    //产线查询
    @RequestMapping(value = "/selectProductLine", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectProductLine(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE ,
                                              @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE ,
                                              @RequestParam(value = "V_V_CXNAME") String V_V_CXNAME,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        Map result = oilService.selectProductLine(V_V_ORGCODE, V_V_DEPTCODE, V_V_CXNAME);
        return result;
    }

    //带产线的设备类型查询
    @RequestMapping(value = "/selectEquipType", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectEquipType(  @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE  ,
                                                 @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE ,
                                                 @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                 @RequestParam(value = "V_V_CXCODE") String V_V_CXCODE,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = oilService.selectEquipType(V_V_PERSONCODE, V_V_ORGCODE, V_V_DEPTCODE, V_V_CXCODE);
        return result;
    }

}
