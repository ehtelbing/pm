package org.building.pm.controller;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.building.pm.base.BaseUtils;
import org.building.pm.service.OilService;
import org.building.pm.service.PM_06Service;
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
import java.util.*;

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
    @Autowired
    private PM_06Service pm_06Service;

    //产线查询
    @RequestMapping(value = "/selectProductLine", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectProductLine(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                 @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                 @RequestParam(value = "V_V_CXNAME") String V_V_CXNAME,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = oilService.selectProductLine(V_V_ORGCODE, V_V_DEPTCODE, V_V_CXNAME);
        return result;
    }

    //带产线的设备类型查询
    @RequestMapping(value = "/selectEquipType", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectEquipType(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                               @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
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

        Map<String, Object> result = oilService.selectStandardInfo(V_V_PERSONCODE, V_V_ORGCODE, V_V_DEPTCODE, V_V_CXCODE, V_V_EQUTYPECODE, V_V_GGXH, page.toString(), limit.toString());
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
        HashMap data = oilService.setLubricationStandard(V_V_GUID, V_V_ORGNAME, V_V_ORGCODE, V_V_DEPTNAME, V_V_DEPTCODE, V_V_CXCODE, V_V_CXNAME, V_V_EQUTYPENAME, V_V_EQUTYPECODE, V_V_BZ_CODE, V_V_BA_NAME, V_V_JSDX, V_V_GGXH, V_V_PERSONCODE);
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
            @RequestParam(value = "V_V_YZ_ID") String V_V_YZ_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = oilService.selectUseOil(V_V_GUID, V_V_YZ_ID);
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

        HashMap data = oilService.deleteGrease(V_V_GUID, I_I_ID);

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

        HashMap data = oilService.deleteUseOil(V_V_GUID, I_I_ID);

        result.put("data", data);

        return result;
    }


    @RequestMapping(value = "/loadOilStandardInfo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> loadOilStandardInfo(@RequestParam(value = "V_V_GUID") String V_V_GUID,
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
        HashMap data = oilService.setOilStandardInfo(I_I_ID, V_V_GUID, V_V_PARTNAME, N_V_OIL_NUM, V_V_LOC_CODE, V_V_LOC_NAME, V_V_OIL_SEASON, V_V_OILTYPE, V_V_OIL_SIGN, V_V_OIL_MAT_CODE, V_V_OIL_MAT_NAME, V_V_OIL_WAY, V_V_OIL_PD, V_V_OIL_NUM, V_V_OIL_ZQMS, V_V_OIL_ZQUNIT, V_V_OIL_ZQSZ, V_V_ZXR, V_V_PERSONCODE);

        result.put("data", data);
        result.put("success", true);
        result.put("oilStandardInfo", oilService.loadOilStandardInfo(V_V_GUID, I_I_ID));
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
        if (StringUtils.isNotEmpty(I_I_ID)) {
            result.put("equScrap", oilService.loadStaYy(I_I_ID));
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
        if (StringUtils.isNotEmpty(I_I_ID)) {
            result.put("equScrap", oilService.loadStaYz(I_I_ID));
        }

        return result;
    }

    //OIL0002设备型号和润滑标准查询
    @RequestMapping(value = "/selectStandardInfoEquType", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectEquFilesAttach(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                    @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                    @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                    @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        HashMap result = oilService.selectStandardInfoEquType(V_V_PERSONCODE, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPECODE);
        return result;
    }

    //OIL0002查询 润滑标准历史表格
    @RequestMapping(value = "/selectStandardInfoHis", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectStandardInfoHis(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                     @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                     @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                     @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                     @RequestParam(value = "V_V_GGXH") String V_V_GGXH,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {

        Map<String, Object> result = oilService.selectStandardInfoHis(V_V_PERSONCODE, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPECODE, V_V_GGXH);

        return result;
    }

    //OIL0002查询 当前设备
    @RequestMapping(value = "/selectStardArdInfoGet", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectStardArdInfoGet(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                     @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                     @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                     @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                     @RequestParam(value = "V_V_GGXH") String V_V_GGXH,
                                                     Integer page,
                                                     Integer limit,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = oilService.selectStardArdInfoGet(V_V_PERSONCODE, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPECODE, V_V_GGXH, page.toString(), limit.toString());
        return result;
    }

    //OIL000201复杂的树
    @RequestMapping(value = "/tree", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> tree(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE, @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE, @RequestParam(value = "V_V_GGXH", required = false) String V_V_GGXH, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> children = new ArrayList<Map<String, Object>>();

        if (V_V_GGXH == "" || V_V_GGXH == null) {
            //厂矿
            List<Map<String, Object>> orgList = new ArrayList<Map<String, Object>>();
            Map org = pm_06Service.PRO_BASE_DEPT_VIEW_ROLE(V_V_PERSONCODE, V_V_DEPTCODE, "%", "基层单位");
            orgList = (List<Map<String, Object>>) org.get("list");
            //设备规格的数据
            List<Map<String, Object>> standardInfoEquTypeList = new ArrayList<Map<String, Object>>();
            Map standardInfoEquType = oilService.selectStandardInfoEquType(V_V_PERSONCODE, null, null, null);
            standardInfoEquTypeList = (List<Map<String, Object>>) standardInfoEquType.get("list");

            if (orgList != null && orgList.size() > 0) {
                for (int i = 0; i < orgList.size(); i++) {
                    Map<String, Object> childrenOrg = new HashMap<>();
                    childrenOrg.put("V_DEPTCODE", orgList.get(i).get("V_DEPTCODE"));
                    childrenOrg.put("V_DEPTNAME", orgList.get(i).get("V_DEPTNAME"));

                    //作业区的数据
                    List<Map<String, Object>> deptList = new ArrayList<Map<String, Object>>();
                    Map dept = pm_06Service.PRO_BASE_DEPT_VIEW_ROLE(V_V_PERSONCODE, childrenOrg.get("V_DEPTCODE").toString(), "%", "主体作业区");
                    deptList = (List<Map<String, Object>>) dept.get("list");
                    if (deptList != null && deptList.size() > 0) {
                        List<Map<String, Object>> deptAllList = new ArrayList<Map<String, Object>>();
                        for (int j = 1; j < deptList.size(); j++) {
                            Map<String, Object> childDept = new HashMap<>();
                            childDept.put("V_DEPTCODE", deptList.get(j).get("V_DEPTCODE"));
                            childDept.put("V_DEPTNAME", deptList.get(j).get("V_DEPTNAME"));

                            List<Map<String, Object>> equipTypeList = new ArrayList<Map<String, Object>>();
                            Map equipType = pm_06Service.PRO_GET_DEPTEQUTYPE_PER(V_V_PERSONCODE, childDept.get("V_DEPTCODE").toString());
                            equipTypeList = (List<Map<String, Object>>) equipType.get("list");
                            if (equipTypeList != null && equipTypeList.size() > 0) {
                                List<Map<String, Object>> equipTypeAllList = new ArrayList<Map<String, Object>>();
                                for (int k = 1; k < equipTypeList.size(); k++) {
                                    Map<String, Object> childEquipType = new HashMap<>();
                                    childEquipType.put("V_DEPTCODE", equipTypeList.get(k).get("V_EQUTYPECODE"));
                                    childEquipType.put("V_DEPTNAME", equipTypeList.get(k).get("V_EQUTYPENAME"));

                                    if (standardInfoEquTypeList != null && standardInfoEquTypeList.size() > 0) {
                                        List<Map<String, Object>> standardInfoEquTypeAllList = new ArrayList<Map<String, Object>>();
                                        for (int z = 0; z < standardInfoEquTypeList.size(); z++) {
                                            if (standardInfoEquTypeList.get(z).get("V_ORGCODE").equals(childrenOrg.get("V_DEPTCODE")) && standardInfoEquTypeList.get(z).get("V_DEPTCODE").equals(childDept.get("V_DEPTCODE")) && standardInfoEquTypeList.get(z).get("V_EQUTYPECODE").equals(childEquipType.get("V_DEPTCODE"))) {
                                                Map<String, Object> childStandardInfoEquType = new HashMap<>();
                                                childStandardInfoEquType.put("V_DEPTCODE", standardInfoEquTypeList.get(z).get("V_GGXH"));
                                                childStandardInfoEquType.put("V_DEPTNAME", standardInfoEquTypeList.get(z).get("V_GGXH"));
                                                childStandardInfoEquType.put("V_GUID", standardInfoEquTypeList.get(z).get("V_GUID"));
                                                childStandardInfoEquType.put("V_ORGCODE", childrenOrg.get("V_DEPTCODE"));
                                                childStandardInfoEquType.put("V_ORGNAME", childrenOrg.get("V_DEPTNAME"));
                                                childStandardInfoEquType.put("V_EQUTYPECODE", childEquipType.get("V_DEPTCODE"));
                                                childStandardInfoEquType.put("V_EQUTYPENAME", childEquipType.get("V_DEPTNAME"));
                                                childStandardInfoEquType.put("DEPTCODE", childDept.get("V_DEPTCODE"));
                                                childStandardInfoEquType.put("DEPTNAME", childDept.get("V_DEPTNAME"));

                                                childStandardInfoEquType.put("leaf", true);
                                                standardInfoEquTypeAllList.add(childStandardInfoEquType);
                                            }
                                        }
                                        childEquipType.put("children", standardInfoEquTypeAllList);
                                    } else {
                                        childEquipType.put("leaf", true);
                                    }
                                    equipTypeAllList.add(childEquipType);
                                }
                                childDept.put("children", equipTypeAllList);
                            } else {
                                childDept.put("leaf", true);
                            }
                            deptAllList.add(childDept);
                        }
                        childrenOrg.put("children", deptAllList);
                    } else {
                        childrenOrg.put("leaf", true);
                    }

                    children.add(childrenOrg);
                }
            }
        } else {
            List<Map<String, Object>> standardInfoList = new ArrayList<Map<String, Object>>();
            Map standardInfo = oilService.OIL_ORG_DEPT_EQUTYPE_GET(V_V_GGXH);
            standardInfoList = (List<Map<String, Object>>) standardInfo.get("list");

            List<Map<String, Object>> orgList = new ArrayList<>();
            List<Map<String, Object>> deptList = new ArrayList<>();
            List<Map<String, Object>> equipTypeList = new ArrayList<>();
            List<Map<String, Object>> ggxhList = new ArrayList<>();
            if (standardInfoList != null && standardInfoList.size() > 0) {
                deptList = (List<Map<String, Object>>) BaseUtils.deepClone(standardInfoList);
                equipTypeList = (List<Map<String, Object>>) BaseUtils.deepClone(standardInfoList);

                Map<String, Map> mspOrg = new HashMap<>();
                for (int j = 0; j < standardInfoList.size(); j++) {
                    Map map = standardInfoList.get(j);
                    String id = (String) map.get("V_ORGCODE");
                    mspOrg.put(id, map);
                }
                Set<String> mspOrgKey = mspOrg.keySet();
                for (String key : mspOrgKey) {
                    Map newMap = mspOrg.get(key);
                    newMap.put("V_ORGCODE", key);
                    orgList.add(newMap);
                }

                Set<Map> deptKeysSet = new HashSet<Map>();
                String V_ORGCODE = "";
                String V_DEPTCODE1 = "";
                Iterator<Map<String, Object>> it1 = deptList.iterator();
                while (it1.hasNext()) {
                    Map<String, Object> map1 = it1.next();

                    V_ORGCODE = (String) map1.get("V_ORGCODE");
                    V_DEPTCODE1 = (String) map1.get("V_DEPTCODE");

                    Map<String, Object> map2 = new HashMap<>();
                    map2.put("V_ORGCODE", V_ORGCODE);
                    map2.put("V_DEPTCODE", V_DEPTCODE1);

                    int beforeSize = deptKeysSet.size();
                    deptKeysSet.add(map2);
                    int afterSize = deptKeysSet.size();
                    if (afterSize != (beforeSize + 1)) {
                        it1.remove();
                    }
                }

                Set<Map> equipTypeKeysSet = new HashSet<Map>();
                String V_DEPTCODE2 = "";
                String V_EQUTYPECODE = "";

                Iterator<Map<String, Object>> it2 = equipTypeList.iterator();
                while (it2.hasNext()) {
                    Map<String, Object> map1 = it2.next();

                    V_DEPTCODE2 = (String) map1.get("V_DEPTCODE");
                    V_EQUTYPECODE = (String) map1.get("V_EQUTYPECODE");

                    Map<String, Object> map2 = new HashMap<>();
                    map2.put("V_DEPTCODE", V_DEPTCODE2);
                    map2.put("V_EQUTYPECODE", V_EQUTYPECODE);

                    int beforeSize = equipTypeKeysSet.size();
                    equipTypeKeysSet.add(map2);
                    int afterSize = equipTypeKeysSet.size();
                    if (afterSize != (beforeSize + 1)) {
                        it2.remove();
                    }
                }

                Map<String, Map> mspGgxh = new HashMap<>();
                for (int z = 0; z < standardInfoList.size(); z++) {
                    Map map = standardInfoList.get(z);
                    String id = (String) map.get("V_GGXH");
                    mspGgxh.put(id, map);
                }
                Set<String> mspGgxhKey = mspGgxh.keySet();
                for (String key : mspGgxhKey) {
                    Map newMap = mspGgxh.get(key);
                    newMap.put("V_GGXH", key);
                    ggxhList.add(newMap);
                }

                if (orgList != null && orgList.size() > 0) {
                    for (int i = 0; i < orgList.size(); i++) {
                        Map<String, Object> childrenOrg = new HashMap<>();
                        childrenOrg.put("V_DEPTCODE", orgList.get(i).get("V_ORGCODE"));
                        childrenOrg.put("V_DEPTNAME", orgList.get(i).get("V_ORGNAME"));

                        if (deptList != null && deptList.size() > 0) {
                            List<Map<String, Object>> deptAllList = new ArrayList<Map<String, Object>>();
                            for (int j = 0; j < deptList.size(); j++) {
                                if (deptList.get(j).get("V_ORGCODE").equals(childrenOrg.get("V_DEPTCODE"))) {
                                    Map<String, Object> childDept = new HashMap<>();
                                    childDept.put("V_DEPTCODE", deptList.get(j).get("V_DEPTCODE"));
                                    childDept.put("V_DEPTNAME", deptList.get(j).get("V_DEPTNAME"));

                                    if (equipTypeList != null && equipTypeList.size() > 0) {
                                        List<Map<String, Object>> equipTypeAllList = new ArrayList<Map<String, Object>>();
                                        for (int k = 0; k < equipTypeList.size(); k++) {
                                            if (equipTypeList.get(k).get("V_DEPTCODE").equals(childDept.get("V_DEPTCODE"))) {
                                                Map<String, Object> childEquipType = new HashMap<>();
                                                childEquipType.put("V_DEPTCODE", equipTypeList.get(k).get("V_EQUTYPECODE"));
                                                childEquipType.put("V_DEPTNAME", equipTypeList.get(k).get("V_EQUTYPENAME"));

                                                if (ggxhList != null && ggxhList.size() > 0) {
                                                    List<Map<String, Object>> ggxhAllList = new ArrayList<Map<String, Object>>();
                                                    for (int z = 0; z < ggxhList.size(); z++) {
                                                        if (ggxhList.get(z).get("V_ORGCODE").equals(childrenOrg.get("V_DEPTCODE")) && ggxhList.get(z).get("V_DEPTCODE").equals(childDept.get("V_DEPTCODE")) && ggxhList.get(z).get("V_EQUTYPECODE").equals(childEquipType.get("V_DEPTCODE"))) {
                                                            Map<String, Object> childggxh = new HashMap<>();
                                                            childggxh.put("V_DEPTCODE", ggxhList.get(z).get("V_GGXH"));
                                                            childggxh.put("V_DEPTNAME", ggxhList.get(z).get("V_GGXH"));
                                                            childggxh.put("V_GUID", ggxhList.get(z).get("V_GUID"));
                                                            childggxh.put("V_ORGCODE", ggxhList.get(z).get("V_ORGCODE"));
                                                            childggxh.put("V_ORGNAME", ggxhList.get(z).get("V_ORGNAME"));
                                                            childggxh.put("V_EQUTYPECODE", ggxhList.get(z).get("V_EQUTYPECODE"));
                                                            childggxh.put("V_EQUTYPENAME", ggxhList.get(z).get("V_EQUTYPENAME"));
                                                            childggxh.put("DEPTCODE", ggxhList.get(z).get("V_DEPTCODE"));
                                                            childggxh.put("DEPTNAME", ggxhList.get(z).get("V_DEPTNAME"));
                                                            childggxh.put("leaf", true);
                                                            ggxhAllList.add(childggxh);
                                                        }
                                                    }
                                                    childEquipType.put("children", ggxhAllList);
                                                } else {
                                                    childEquipType.put("leaf", true);
                                                }
                                                equipTypeAllList.add(childEquipType);
                                            }
                                        }
                                        childDept.put("children", equipTypeAllList);
                                    } else {
                                        childDept.put("leaf", true);
                                    }
                                    deptAllList.add(childDept);
                                }
                            }
                            childrenOrg.put("children", deptAllList);
                        } else {
                            childrenOrg.put("leaf", true);
                        }
                        children.add(childrenOrg);
                    }
                }

            }
        }

        result.put("children", children);
        result.put("success", true);
        return result;
    }

    //OIL000201查询
    @RequestMapping(value = "/selectStardArdInfo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectStardArdInfo(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                  @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                  @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                  @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                  @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                  @RequestParam(value = "V_V_GGXH") String V_V_GGXH,
                                                  Integer page,
                                                  Integer limit,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        HashMap result = oilService.selectStardArdInfo(V_V_PERSONCODE, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPECODE, V_V_EQUCODE, V_V_GGXH, page.toString(), limit.toString());
        return result;
    }

    //OIL000201新增规格型号
    @RequestMapping(value = "/insertGgxh", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> insertGgxh(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                          @RequestParam(value = "V_V_ORGNAME") String V_V_ORGNAME,
                                          @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                          @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
                                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                          @RequestParam(value = "V_V_CXCODE") String V_V_CXCODE,
                                          @RequestParam(value = "V_V_CXNAME") String V_V_CXNAME,
                                          @RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                          @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                          @RequestParam(value = "V_V_BZ_CODE") String V_V_BZ_CODE,
                                          @RequestParam(value = "V_V_BZ_NAME") String V_V_BZ_NAME,
                                          @RequestParam(value = "V_V_JSDX") String V_V_JSDX,
                                          @RequestParam(value = "V_V_GGXH") String V_V_GGXH,
                                          @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = oilService.insertGgxh(V_V_GUID, V_V_ORGNAME, V_V_ORGCODE, V_V_DEPTNAME, V_V_DEPTCODE, V_V_CXCODE, V_V_CXNAME, V_V_EQUTYPENAME, V_V_EQUTYPECODE, V_V_BZ_CODE, V_V_BZ_NAME, V_V_JSDX, V_V_GGXH, V_V_PERSONCODE);
        result.put("data", data);
        result.put("success", true);
        return result;
    }

    //OIL0002查询 当前设备
    @RequestMapping(value = "/selectInsertEquip", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectInsertEquip(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                 @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                 @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                 @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                 Integer page,
                                                 Integer limit,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = oilService.selectInsertEquip(V_V_PERSONCODE, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPECODE, page.toString(), limit.toString());
        return result;
    }

    //OIL000201新增设备
    @RequestMapping(value = "/setOilStandardEqu", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> setOilStandardEqu(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                 @RequestParam(value = "V_V_ORGNAME") String V_V_ORGNAME,
                                                 @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                 @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
                                                 @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                 @RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                                 @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                 @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                                 @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                 @RequestParam(value = "V_V_GGXH") String V_V_GGXH,
                                                 @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = oilService.setOilStandardEqu(V_V_GUID, V_V_ORGNAME, V_V_ORGCODE, V_V_DEPTNAME, V_V_DEPTCODE, V_V_EQUTYPENAME, V_V_EQUTYPECODE, V_V_EQUNAME, V_V_EQUCODE, V_V_GGXH, V_V_PERSONCODE);
        result.put("data", data);
        result.put("success", true);
        return result;
    }

    //设备规格与设备关联的导出
    @RequestMapping(value = "/excelGgxhEquip", method = RequestMethod.GET)
    @ResponseBody
    public void excelCheckResult(@RequestParam(value = "V_ORGNAME_LIST", required = false) List<String> V_ORGNAME_LIST,
                                 @RequestParam(value = "V_DEPTNAME_LIST", required = false) List<String> V_DEPTNAME_LIST,
                                 @RequestParam(value = "V_EQUTYPENAME_LIST", required = false) List<String> V_EQUTYPENAME_LIST,
                                 @RequestParam(value = "V_GGXH_LIST", required = false) List<String> V_GGXH_LIST,
                                 @RequestParam(value = "V_EQUCODE_LIST", required = false) List<String> V_EQUCODE_LIST,
                                 @RequestParam(value = "V_EQUNAME_LIST", required = false) List<String> V_EQUNAME_LIST,
                                 @RequestParam(value = "V_BZ_NAME_LIST", required = false) List<String> V_BZ_NAME_LIST,
                                 String V_V_ORGCODE,
                                 String V_V_DEPTCODE,
                                 String V_V_EQUTYPECODE,
                                 String V_V_EQUCODE,
                                 String V_V_GGXH,
                                 String V_V_PERSONCODE,
                                 Integer page,
                                 Integer limit,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();

        sheet.setColumnWidth(0, 2000);
        sheet.setColumnWidth(1, 6000);
        sheet.setColumnWidth(2, 6000);
        sheet.setColumnWidth(3, 6000);
        sheet.setColumnWidth(4, 5000);
        sheet.setColumnWidth(5, 5000);
        sheet.setColumnWidth(6, 4000);
        sheet.setColumnWidth(7, 6000);
        sheet.setColumnWidth(8, 6000);

        HSSFRow row = sheet.createRow((int) 0);
        row.setHeightInPoints(30);
        //标题栏样式
        HSSFCellStyle style = wb.createCellStyle();
        HSSFFont font = wb.createFont();
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
        style.setFillForegroundColor(HSSFColor.GREY_50_PERCENT.index);
        style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        font.setFontHeightInPoints((short) 12);// 设置字体大小
        font.setColor(HSSFColor.WHITE.index);
        style.setFont(font);
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

        HSSFCell cell1 = row.createCell((short) 0);
        cell1.setCellValue("序号");
        cell1.setCellStyle(style);

        HSSFCell cell2 = row.createCell((short) 1);
        cell2.setCellValue("厂矿");
        cell2.setCellStyle(style);

        HSSFCell cell3 = row.createCell((short) 2);
        cell3.setCellValue("作业区");
        cell3.setCellStyle(style);

        HSSFCell cell4 = row.createCell((short) 3);
        cell4.setCellValue("设备类型");
        cell4.setCellStyle(style);

        HSSFCell cell5 = row.createCell((short) 4);
        cell5.setCellValue("已匹配的规格型号");
        cell5.setCellStyle(style);

        HSSFCell cell6 = row.createCell((short) 5);
        cell6.setCellValue("设备编码");
        cell6.setCellStyle(style);

        HSSFCell cell7 = row.createCell((short) 6);
        cell7.setCellValue("设备名称");
        cell7.setCellStyle(style);

        HSSFCell cell8 = row.createCell((short) 7);
        cell8.setCellValue("设备位置");
        cell8.setCellStyle(style);

        HSSFCell cell9 = row.createCell((short) 8);
        cell9.setCellValue("匹配模板");
        cell9.setCellStyle(style);


        List<Map<String, Object>> ggxhEquipList = new ArrayList<Map<String, Object>>();

        //如果是选择了很多列
        if (V_ORGNAME_LIST.size() > 0) {
            for (int i = 0; i < V_ORGNAME_LIST.size(); i++) {
                Map<String, Object> ggxhEquipDate = new HashMap<String, Object>();
                if (V_BZ_NAME_LIST.size() == 0) {
                    ggxhEquipDate.put("V_ORGNAME", (String) V_ORGNAME_LIST.get(i));
                    ggxhEquipDate.put("V_DEPTNAME", (String) V_DEPTNAME_LIST.get(i));
                    ggxhEquipDate.put("V_EQUTYPENAME", (String) V_EQUTYPENAME_LIST.get(i));
                    ggxhEquipDate.put("V_GGXH", (String) V_GGXH_LIST.get(i));
                    ggxhEquipDate.put("V_EQUCODE", (String) V_EQUCODE_LIST.get(i));
                    ggxhEquipDate.put("V_EQUNAME", (String) V_EQUNAME_LIST.get(i));
                    ggxhEquipDate.put("V_BZ_NAME", "");
                } else {
                    ggxhEquipDate.put("V_ORGNAME", (String) V_ORGNAME_LIST.get(i));
                    ggxhEquipDate.put("V_DEPTNAME", (String) V_DEPTNAME_LIST.get(i));
                    ggxhEquipDate.put("V_EQUTYPENAME", (String) V_EQUTYPENAME_LIST.get(i));
                    ggxhEquipDate.put("V_GGXH", (String) V_GGXH_LIST.get(i));
                    ggxhEquipDate.put("V_EQUCODE", (String) V_EQUCODE_LIST.get(i));
                    ggxhEquipDate.put("V_EQUNAME", (String) V_EQUNAME_LIST.get(i));
                    ggxhEquipDate.put("V_BZ_NAME", (String) V_BZ_NAME_LIST.get(i));
                }
                ggxhEquipList.add(ggxhEquipDate);
            }
        } else {
            Map<String, Object> data = oilService.selectStardArdInfo(V_V_PERSONCODE, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPECODE, V_V_EQUCODE, V_V_GGXH, page.toString(), limit.toString());
            ggxhEquipList = (List<Map<String, Object>>) data.get("list");
        }

        for (int j = 0; j < ggxhEquipList.size(); j++) {
            row = sheet.createRow(j + 1);
            row.setHeightInPoints(25);
            HSSFCell cellContent = row.createCell(0);
            cellContent.setCellValue(j + 1);// 序号

            cellContent = row.createCell(1);
            cellContent.setCellValue(ggxhEquipList.get(j).get("V_ORGNAME") == null ? "" : ggxhEquipList.get(j).get("V_ORGNAME").toString());// 厂矿

            cellContent = row.createCell(2);
            cellContent.setCellValue(ggxhEquipList.get(j).get("V_DEPTNAME") == null ? "" : ggxhEquipList.get(j).get("V_DEPTNAME").toString());// 作业区

            cellContent = row.createCell(3);
            cellContent.setCellValue(ggxhEquipList.get(j).get("V_EQUTYPENAME") == null ? "" : ggxhEquipList.get(j).get("V_EQUTYPENAME").toString());// 设备类型

            cellContent = row.createCell(4);
            cellContent.setCellValue(ggxhEquipList.get(j).get("V_GGXH") == null ? "" : ggxhEquipList.get(j).get("V_GGXH").toString());// 已匹配的规格型号

            cellContent = row.createCell(5);
            cellContent.setCellValue(ggxhEquipList.get(j).get("V_EQUCODE") == null ? "" : ggxhEquipList.get(j).get("V_EQUCODE").toString());// 设备编码

            cellContent = row.createCell(6);
            cellContent.setCellValue(ggxhEquipList.get(j).get("V_EQUNAME") == null ? "" : ggxhEquipList.get(j).get("V_EQUNAME").toString());// 设备名称

            cellContent = row.createCell(7);
            cellContent.setCellValue("");// 设备位置

            cellContent = row.createCell(8);
            cellContent.setCellValue(ggxhEquipList.get(j).get("V_BZ_NAME    ") == null ? "" : ggxhEquipList.get(j).get("V_BZ_NAME").toString());// 匹配模板
        }

        try {
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            String fileName = new String("设备规格与设备.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
            OutputStream out = response.getOutputStream();

            wb.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //OIL000201删除设备
    @RequestMapping(value = "/deleteEquGgxh", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteEquGgxh(@RequestParam(value = "I_I_ID", required = false) String I_I_ID,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = oilService.deleteEquGgxh(I_I_ID);

        result.put("data", data);

        return result;
    }

}
