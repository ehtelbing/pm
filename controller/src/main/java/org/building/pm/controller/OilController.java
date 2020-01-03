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
    //润滑标准查询
    @RequestMapping(value = "/selectStandardInfo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectStandardInfo(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                         @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                         @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                         @RequestParam(value = "V_V_CXCODE") String V_V_CXCODE,
                                                         @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                         @RequestParam(value = "V_V_GGXH") String V_V_GGXH,
                                                    Integer page,
                                                    Integer limit,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {

        Map<String, Object> result = oilService.selectStandardInfo(V_V_PERSONCODE,V_V_ORGCODE,V_V_DEPTCODE,V_V_CXCODE,V_V_EQUTYPECODE,V_V_GGXH,page.toString(), limit.toString());
        result.put("success", true);

        return result;
    }
    //润滑标准保存
    @RequestMapping(value = "/setLubricationStandard", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> setLubricationStandard(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                      @RequestParam(value = "V_V_ORGNAME") String V_V_ORGNAME,
                                                      @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                      @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
                                                      @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                      @RequestParam(value = "V_V_CXCODE") String V_V_CXCODE,
                                                      @RequestParam(value = "V_V_CXNAME") String V_V_CXNAME,
                                                      @RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                                      @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                      @RequestParam(value = "V_V_BZ_CODE") String V_V_BZ_CODE,
                                                      @RequestParam(value = "V_V_BZ_NAME") String V_V_BA_NAME,
                                                      @RequestParam(value = "V_V_JSDX") String V_V_JSDX,
                                                      @RequestParam(value = "V_V_GGXH") String V_V_GGXH,
                                                      @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                      HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = oilService.setLubricationStandard(V_V_GUID, V_V_ORGNAME, V_V_ORGCODE, V_V_DEPTNAME, V_V_DEPTCODE,V_V_CXCODE, V_V_CXNAME,V_V_EQUTYPENAME, V_V_EQUTYPECODE, V_V_BZ_CODE, V_V_BA_NAME, V_V_JSDX, V_V_GGXH, V_V_PERSONCODE);
        result.put("success", true);
        result.put("data", data);
        result.put("V_INFO", data.get("V_INFO"));
        result.put("LubricationStandard", oilService.loadLubricationStandard(V_V_GUID).get("list"));
        return result;
    }

    //润滑标准删除
    @RequestMapping(value = "/deleteAttachmentType", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteAttachmentType(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = oilService.deleteAttachmentType(V_V_GUID);

        result.put("data", data);

        return result;
    }


    //通过id查询油脂标准
    @RequestMapping(value = "/loadLubricationStandard", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> loadLubricationStandard(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = oilService.loadLubricationStandard(V_V_GUID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);

        return data;
    }

    //通过id查询油脂
    @RequestMapping(value = "/selectGrease", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectGrease(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = oilService.selectGrease(V_V_GUID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);

        return data;
    }

    //通过id查询用油
    @RequestMapping(value = "/selectUseOil", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectUseOil(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_YZ_ID") String   V_V_YZ_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = oilService.selectUseOil(V_V_GUID,  V_V_YZ_ID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);

        return data;
    }

    //油脂删除
    @RequestMapping(value = "/deleteGrease", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteGrease(@RequestParam(value = "V_V_GUID", required = false) String V_V_GUID,
                                            @RequestParam(value = "I_I_ID", required = false) String I_I_ID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = oilService.deleteGrease(V_V_GUID,I_I_ID);

        result.put("data", data);

        return result;
    }

    //用油删除
    @RequestMapping(value = "/deleteUseOil", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteUseOil(@RequestParam(value = "V_V_GUID", required = false) String V_V_GUID,
                                            @RequestParam(value = "I_I_ID", required = false) String I_I_ID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = oilService.deleteUseOil(V_V_GUID,I_I_ID);

        result.put("data", data);

        return result;
    }


    @RequestMapping(value = "/loadOilStandardInfo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> loadOilStandardInfo(  @RequestParam(value = "V_V_GUID") String V_V_GUID  ,
                                                 @RequestParam(value = "I_I_ID") String I_I_ID,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = oilService.loadOilStandardInfo(V_V_GUID, I_I_ID);
        return result;
    }

    @RequestMapping(value = "/setOilStandardInfo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> setOilStandardInfo(@RequestParam(value = "I_I_ID") String I_I_ID,
                                                  @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                  @RequestParam(value = "V_V_PARTNAME") String V_V_PARTNAME,
                                                  @RequestParam(value = "N_V_OIL_NUM") Double N_V_OIL_NUM,
                                                  @RequestParam(value = "V_V_LOC_CODE") String V_V_LOC_CODE,
                                                  @RequestParam(value = "V_V_LOC_NAME") String V_V_LOC_NAME,
                                                  @RequestParam(value = "V_V_OIL_SEASON") String V_V_OIL_SEASON,
                                                  @RequestParam(value = "V_V_OILTYPE") String V_V_OILTYPE,
                                                  @RequestParam(value = "V_V_OIL_SIGN") String V_V_OIL_SIGN,
                                                  @RequestParam(value = "V_V_OIL_MAT_CODE") String V_V_OIL_MAT_CODE,
                                                  @RequestParam(value = "V_V_OIL_MAT_NAME") String V_V_OIL_MAT_NAME,
                                                  @RequestParam(value = "V_V_OIL_WAY") String V_V_OIL_WAY,
                                                  @RequestParam(value = "V_V_OIL_PD") String V_V_OIL_PD,
                                                  @RequestParam(value = "V_V_OIL_NUM") String V_V_OIL_NUM,
                                                  @RequestParam(value = "V_V_OIL_ZQMS") String V_V_OIL_ZQMS,
                                                  @RequestParam(value = "V_V_OIL_ZQUNIT") String V_V_OIL_ZQUNIT,
                                                  @RequestParam(value = "V_V_OIL_ZQSZ") String V_V_OIL_ZQSZ,
                                                  @RequestParam(value = "V_V_ZXR") String V_V_ZXR,
                                                  @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,

                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = oilService.setOilStandardInfo(I_I_ID, V_V_GUID, V_V_PARTNAME, N_V_OIL_NUM, V_V_LOC_CODE,V_V_LOC_NAME, V_V_OIL_SEASON, V_V_OILTYPE, V_V_OIL_SIGN, V_V_OIL_MAT_CODE, V_V_OIL_MAT_NAME, V_V_OIL_WAY, V_V_OIL_PD, V_V_OIL_NUM, V_V_OIL_ZQMS, V_V_OIL_ZQUNIT, V_V_OIL_ZQSZ, V_V_ZXR, V_V_PERSONCODE);

        result.put("data", data);
        result.put("success", true);
        //result.put("AttachmentType", specEquipService.loadPlanApply(I_ID));
        return result;
    }

    //查询某个润滑标准(用油)
    @RequestMapping(value = "/loadStaYy", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> loadStaYy(
            @RequestParam(value = "I_I_ID") String I_I_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        Map<String, Object> staYy = oilService.loadStaYy(I_I_ID);

        result.put("staYy", staYy);
        result.put("success", true);
        return result;
    }

    //润滑标准新增修改(用油)
    @RequestMapping(value = "/yyInfoSet", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> yyInfoSet(@RequestParam(value = "I_I_ID") String I_I_ID,
                                           @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                           @RequestParam(value = "V_V_YZ_ID") String V_V_YZ_ID,
                                           @RequestParam(value = "v_v_oil_way") String v_v_oil_way,
                                           @RequestParam(value = "v_v_oil_num") String v_v_oil_num,
                                           @RequestParam(value = "v_v_oil_zqms") String v_v_oil_zqms,
                                           @RequestParam(value = "v_v_oil_pd") String v_v_oil_pd,
                                           @RequestParam(value = "v_v_oil_zqunit") String v_v_oil_zqunit,
                                           @RequestParam(value = "v_v_oil_zqsz") String v_v_oil_zqsz,
                                           @RequestParam(value = "v_v_zxr") String v_v_zxr,
                                           @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = oilService.yyInfoSet(I_I_ID, V_V_GUID, V_V_YZ_ID, v_v_oil_way, v_v_oil_num, v_v_oil_zqms, v_v_oil_pd, v_v_oil_zqunit, v_v_oil_zqsz, v_v_zxr, V_V_PERSONCODE);
        result.put("success", true);
        result.put("data", data);
        result.put("V_INFO", data.get("V_INFO"));
        if(StringUtils.isNotEmpty(I_I_ID)){
            result.put("equScrap",oilService.loadStaYy(I_I_ID));
        }

        return result;
    }

    //查询某个润滑标准(油脂)
    @RequestMapping(value = "/loadStaYz", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> loadStaYz(
            @RequestParam(value = "I_I_ID") String I_I_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        Map<String, Object> staYz = oilService.loadStaYz(I_I_ID);

        result.put("staYz", staYz);
        result.put("success", true);
        return result;
    }

    //润滑标准新增修改(油脂)
    @RequestMapping(value = "/yzInfoSet", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> yzInfoSet(@RequestParam(value = "I_I_ID") String I_I_ID,
                                         @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                         @RequestParam(value = "V_V_PARTNAME") String V_V_PARTNAME,
                                         @RequestParam(value = "N_V_OIL_NUM") String N_V_OIL_NUM,
                                         @RequestParam(value = "V_V_LOC_CODE") String V_V_LOC_CODE,
                                         @RequestParam(value = "V_V_LOC_NAME") String V_V_LOC_NAME,
                                         @RequestParam(value = "v_v_oil_season") String v_v_oil_season,
                                         @RequestParam(value = "v_v_oiltype") String v_v_oiltype,
                                         @RequestParam(value = "v_v_oil_sign") String v_v_oil_sign,
                                         @RequestParam(value = "v_v_oil_mat_code") String v_v_oil_mat_code,
                                         @RequestParam(value = "v_v_oil_mat_name") String v_v_oil_mat_name,
                                         @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = oilService.yzInfoSet(I_I_ID, V_V_GUID, V_V_PARTNAME, N_V_OIL_NUM, V_V_LOC_CODE, V_V_LOC_NAME, v_v_oil_season, v_v_oiltype, v_v_oil_sign, v_v_oil_mat_code, v_v_oil_mat_name, V_V_PERSONCODE);
        result.put("success", true);
        result.put("data", data);
        result.put("V_INFO", data.get("V_INFO"));
        if(StringUtils.isNotEmpty(I_I_ID)){
            result.put("equScrap",oilService.loadStaYz(I_I_ID));
        }

        return result;
    }

}
