package org.building.pm.controller;

import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.ZykService;
import org.codehaus.xfire.client.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.sql.SQLException;
import java.util.*;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

@Controller
@RequestMapping("/app/pm/Zyk")
public class ZykController {

    @Autowired
    private ZykService zykService;

    @Value("#{configProperties['WS_MMToXL']}")
    private String WS_MMToXL;


    //计划厂矿和作业区
    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_VIEW_ROLE(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                       @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zykService.PRO_BASE_DEPT_VIEW(V_V_DEPTCODE, V_V_DEPTTYPE);

        List<Map<String, Object>> zyklist = (List) data.get("list");

        result.put("list", zyklist);
        result.put("success", true);
        return result;
    }

    //查询物料
    @RequestMapping(value = "/ReadMaterail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GetStoreList(@RequestParam(value = "x_code") String x_code,
                                            @RequestParam(value = "x_name") String x_name,
                                            @RequestParam(value = "x_type") String x_type) throws SQLException {
        Map result = new HashMap();
        try {
            Client client = new Client(new URL(WS_MMToXL));

            Object[] results = client.invoke("ReadMaterail",new String[] {x_code, x_name, x_type});

            Document doc = DocumentHelper.parseText(results[0].toString());

            Element rootElt = doc.getRootElement();                //获取根节点
            Iterator iter = rootElt.elementIterator("mat");        //获取二级节点
            List<Map> list = new ArrayList<Map>();

            while(iter.hasNext()){

                Element recordEle = (Element)iter.next();           //输出下一行

                Map M = new HashMap();

                M.put("MAT_NO", recordEle.elementTextTrim("MAT_NO"));
                M.put("MAT_DESC", recordEle.elementTextTrim("MAT_DESC"));
                M.put("UNIT", recordEle.elementTextTrim("UNIT"));
                M.put("PLAN_PRICE", recordEle.elementTextTrim("PLAN_PRICE"));
                M.put("MAT_OLD_NO", recordEle.elementTextTrim("MAT_OLD_NO"));

                list.add(M);

            }
            result.put("ret", "Success");
            result.put("list", list);
        } catch (MalformedURLException e) {
            result.put("ret", "Fail");
            e.printStackTrace();
        } catch (Exception e) {
            result.put("ret", "Fail");
            e.printStackTrace();
        }

        return result;
    }

    //7121的数据查询
    @RequestMapping(value = "/PRO_RUN7121_SELECTEQULIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7121_SELECTEQULIST(@RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                                                         @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7121_SELECTEQULIST(V_DEPARTCODE, V_PLANTCODE);
        return result;
    }

    //7121新增根据设备编号查数据
    @RequestMapping(value = "/PRO_RUN7121_GETEQULIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7121_GETEQULIST(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7121_GETEQULIST(V_EQU_ID);
        return result;
    }

    //7121新增
    @RequestMapping(value = "/PRO_RUN7121_ADDEQU", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7121_ADDEQU(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                  @RequestParam(value = "V_EQU_DESC") String V_EQU_DESC,
                                                  @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                                                  @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                                                  @RequestParam(value = "V_USERID") String V_USERID,

                                                  @RequestParam(value = "V_USERNAME") String V_USERNAME,
                                                  @RequestParam(value = "V_STATUS") String V_STATUS,
                                                  @RequestParam(value = "V_PP_CODE") String V_PP_CODE,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7121_ADDEQU(V_EQU_ID, V_EQU_DESC, V_DEPARTCODE, V_PLANTCODE, V_USERID,
                V_USERNAME, V_STATUS, V_PP_CODE);
        return result;
    }

    //7121修改
    @RequestMapping(value = "/PRO_RUN7121_UPDATEEQU", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7121_UPDATEEQU(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                     @RequestParam(value = "V_EQU_DESC") String V_EQU_DESC,
                                                     @RequestParam(value = "V_USERID") String V_USERID,
                                                     @RequestParam(value = "V_USERNAME") String V_USERNAME,
                                                     @RequestParam(value = "V_STATUS") String V_STATUS,
                                                     @RequestParam(value = "V_PP_CODE") String V_PP_CODE,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7121_UPDATEEQU(V_EQU_ID, V_EQU_DESC, V_USERID,
                V_USERNAME, V_STATUS, V_PP_CODE);
        return result;
    }

    //7121状态停用
    @RequestMapping(value = "/PRO_RUN7121_STOP", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7121_STOP(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7121_STOP(V_EQU_ID);
        return result;
    }

    //7121状态启用
    @RequestMapping(value = "/PRO_RUN7121_STARTEQU", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7121_STARTEQU(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7121_STARTEQU(V_EQU_ID);
        return result;
    }

    //7122查询
    @RequestMapping(value = "/PRO_RUN7122_SELECTVGLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7122_SELECTVGLIST(@RequestParam(value = "V_VG_DESC") String V_VG_DESC,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7122_SELECTVGLIST(V_VG_DESC);
        return result;
    }

    //7122新增
    @RequestMapping(value = "/PRO_RUN7122_ADDVGURL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7122_ADDVGURL(@RequestParam(value = "V_VG_DESC") String V_VG_DESC,
                                                    @RequestParam(value = "V_URL") String V_URL,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7122_ADDVGURL(V_VG_DESC, V_URL);
        return result;
    }

    //7122删除
    @RequestMapping(value = "/PRO_RUN7122_DELETEVGURL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7122_DELETEVGURL(@RequestParam(value = "V_ID") String V_ID,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7122_DELETEVGURL(V_ID);
        return result;
    }

    //7123查询
    @RequestMapping(value = "/PRO_RUN7123_SELECTSTLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7123_SELECTSTLIST(@RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7123_SELECTSTLIST(V_SITE_ID);
        return result;
    }

    //7123新增
    @RequestMapping(value = "/PRO_RUN7123_ADDST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7123_ADDST(@RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                 @RequestParam(value = "V_TAG_DESC") String V_TAG_DESC,
                                                 @RequestParam(value = "V_TAG_UNIT") String V_TAG_UNIT,
                                                 @RequestParam(value = "V_STATUS") String V_STATUS,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7123_ADDST(V_SITE_ID, V_TAG_DESC, V_TAG_UNIT, V_STATUS);
        return result;
    }

    //7123修改
    @RequestMapping(value = "/PRO_RUN7123_UPDATEST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7123_UPDATEST(@RequestParam(value = "V_TAG_ID") String V_TAG_ID,
                                                    @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                    @RequestParam(value = "V_TAG_DESC") String V_TAG_DESC,
                                                    @RequestParam(value = "V_TAG_UNIT") String V_TAG_UNIT,
                                                    @RequestParam(value = "V_STATUS") String V_STATUS,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7123_UPDATEST(V_TAG_ID, V_SITE_ID, V_TAG_DESC, V_TAG_UNIT, V_STATUS);
        return result;
    }

    //7123状态停用
    @RequestMapping(value = "/PRO_RUN7123_STOPST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7123_STOPST(@RequestParam(value = "V_TAG_ID") String V_TAG_ID,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7123_STOPST(V_TAG_ID);
        return result;
    }

    //7123状态启用
    @RequestMapping(value = "/PRO_RUN7123_STARTST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7123_STARTST(@RequestParam(value = "V_TAG_ID") String V_TAG_ID,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7123_STARTST(V_TAG_ID);
        return result;
    }

    //7124查询
    @RequestMapping(value = "/PRO_RUN7124_SUPPLYLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7124_SUPPLYLIST(@RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                                                      @RequestParam(value = "V_SUPPLY_NAME") String V_SUPPLY_NAME,
                                                      @RequestParam(value = "V_SUPPLY_STATUS") String V_SUPPLY_STATUS,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7124_SUPPLYLIST(V_SUPPLY_CODE, V_SUPPLY_NAME, V_SUPPLY_STATUS);
        return result;
    }

    //7124新增
    @RequestMapping(value = "/PRO_RUN7124_ADDSUPPLY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7124_ADDSUPPLY(@RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                                                     @RequestParam(value = "V_SUPPLY_NAME") String V_SUPPLY_NAME,
                                                     @RequestParam(value = "V_SUPPLY_DESC") String V_SUPPLY_DESC,
                                                     @RequestParam(value = "V_SUPPLY_RENAGE") String V_SUPPLY_RENAGE,
                                                     @RequestParam(value = "V_SUPPLY_MANAGER") String V_SUPPLY_MANAGER,

                                                     @RequestParam(value = "V_LINK_PERSON") String V_LINK_PERSON,
                                                     @RequestParam(value = "V_LINK_TYPE") String V_LINK_TYPE,
                                                     @RequestParam(value = "V_LINK_PHONECODE") String V_LINK_PHONECODE,
                                                     @RequestParam(value = "V_SUPPLY_STATUS") String V_SUPPLY_STATUS,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7124_ADDSUPPLY(V_SUPPLY_CODE, V_SUPPLY_NAME, V_SUPPLY_DESC, V_SUPPLY_RENAGE, V_SUPPLY_MANAGER,
                V_LINK_PERSON, V_LINK_TYPE, V_LINK_PHONECODE, V_SUPPLY_STATUS);
        return result;
    }

    //7124修改
    @RequestMapping(value = "/PRO_RUN7124_UPDATESUPPLY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7124_UPDATESUPPLY(@RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                                                        @RequestParam(value = "V_SUPPLY_NAME") String V_SUPPLY_NAME,
                                                        @RequestParam(value = "V_SUPPLY_DESC") String V_SUPPLY_DESC,
                                                        @RequestParam(value = "V_SUPPLY_RENAGE") String V_SUPPLY_RENAGE,
                                                        @RequestParam(value = "V_SUPPLY_MANAGER") String V_SUPPLY_MANAGER,

                                                        @RequestParam(value = "V_LINK_PERSON") String V_LINK_PERSON,
                                                        @RequestParam(value = "V_LINK_TYPE") String V_LINK_TYPE,
                                                        @RequestParam(value = "V_LINK_PHONECODE") String V_LINK_PHONECODE,
                                                        @RequestParam(value = "V_SUPPLY_STATUS") String V_SUPPLY_STATUS,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7124_UPDATESUPPLY(V_SUPPLY_CODE, V_SUPPLY_NAME, V_SUPPLY_DESC, V_SUPPLY_RENAGE, V_SUPPLY_MANAGER,
                V_LINK_PERSON, V_LINK_TYPE, V_LINK_PHONECODE, V_SUPPLY_STATUS);
        return result;
    }

    //7124状态停用
    @RequestMapping(value = "/PRO_RUN7124_STOPST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7124_STOPST(@RequestParam(value = "SUPPLY_CODE") String SUPPLY_CODE,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7124_STOPST(SUPPLY_CODE);
        return result;
    }

    //7124状态启用
    @RequestMapping(value = "/PRO_RUN7124_STARTST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7124_STARTST(@RequestParam(value = "SUPPLY_CODE") String SUPPLY_CODE,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7124_STARTST(SUPPLY_CODE);
        return result;
    }

    //712401查询
    @RequestMapping(value = "/PRO_RUN7124_SUPPLYMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7124_SUPPLYMATLIST(@RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7124_SUPPLYMATLIST(V_SUPPLY_CODE);
        return result;
    }

    //712401新增
    @RequestMapping(value = "/PRO_RUN7124_ADDSUPPLYMAT_NEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7124_ADDSUPPLYMAT_NEW(@RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                                                        @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7124_ADDSUPPLYMAT_NEW(V_SUPPLY_CODE, V_MATERIALCODE);
        return result;
    }

    //712401删除
    @RequestMapping(value = "/PRO_RUN7124_DELSUPPLYMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7124_DELSUPPLYMAT(@RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                                                        @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7124_DELSUPPLYMAT(V_SUPPLY_CODE, V_MATERIALCODE);
        return result;
    }

    //7125查询
    @RequestMapping(value = "/PRO_RUN7125_EQUVGLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7125_EQUVGLIST(@RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                                                     @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7125_EQUVGLIST(V_PLANTCODE, V_DEPARTCODE);
        return result;
    }

    //7125新增
    @RequestMapping(value = "/PRO_RUN7125_ADDEQUVG_NEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7125_ADDEQUVG_NEW(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                    @RequestParam(value = "V_VG_ID") String V_VG_ID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7125_ADDEQUVG_NEW(V_EQU_ID, V_VG_ID);
        return result;
    }

    //7125删除
    @RequestMapping(value = "/PRO_RUN7125_DELEQUVG", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7125_DELEQUVG(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                    @RequestParam(value = "V_VG_ID") String V_VG_ID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7125_DELEQUVG(V_EQU_ID, V_VG_ID);
        return result;
    }

    //7126查询
    @RequestMapping(value = "/PRO_RUN7126_SITEVGLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7126_SITEVGLIST(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7126_SITEVGLIST(V_EQU_ID);
        return result;
    }

    //7126新增
    @RequestMapping(value = "/PRO_RUN7126_ADDSITEVG_NEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7126_ADDSITEVG_NEW(@RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                     @RequestParam(value = "V_VG_ID") String V_VG_ID,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7126_ADDSITEVG_NEW(V_SITE_ID, V_VG_ID);
        return result;
    }

    //7126删除
    @RequestMapping(value = "/PRO_RUN7126_DELSITEVG", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7126_DELSITEVG(@RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                     @RequestParam(value = "V_VG_ID") String V_VG_ID,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7126_DELSITEVG(V_SITE_ID, V_VG_ID);
        return result;
    }

    //7134查询重点备件表（临时）
    @RequestMapping(value = "/PRO_RUN7134_GETBJLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7134_GETBJLIST(@RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                                    @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7134_GETBJLIST(A_MAT_NO, A_MAT_DESC);
        return result;
    }

    //7134查询重点备件表
    @RequestMapping(value = "/PG_RUN7134_GETBJLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PG_RUN7134_GETBJLIST(@RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                                     @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = zykService.PG_RUN7134_GETBJLIST(A_MAT_NO, A_MAT_DESC);
        return result;
    }

    //7134查询备件安装位置
    @RequestMapping(value = "/PG_RUN7134_GETSITELIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PG_RUN7134_GETSITELIST(@RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = zykService.PG_RUN7134_GETSITELIST(A_MAT_NO);
        return result;
    }

    //7134查询备件安装位置（临时）
    @RequestMapping(value = "/PRO_RUN7134_GETSITELIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7134_GETSITELIST(@RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7134_GETSITELIST(A_MAT_NO);
        return result;
    }

    //7134新增备件的备件查询
    @RequestMapping(value = "/PG_RUN7134_GETMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PG_RUN7134_GETMATLIST(@RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                                     @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = zykService.PG_RUN7134_GETMATLIST(A_MAT_NO, A_MAT_DESC);
        return result;
    }

    //7134备件新增
    @RequestMapping(value = "/PG_RUN7134_ADDBJ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PG_RUN7134_ADDBJ(@RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                                @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
                                                @RequestParam(value = "A_ETALON") String A_ETALON,
                                                @RequestParam(value = "A_UNIT") String A_UNIT,
                                                @RequestParam(value = "A_PRICE") String A_PRICE,
                                                HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {
        Map result = zykService.PG_RUN7134_ADDBJ(A_MAT_NO, A_MAT_DESC, A_ETALON, A_UNIT, A_PRICE);
        return result;
    }

    //7134备件新增（临时）
    @RequestMapping(value = "/PRO_RUN7134_ADDBJ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7134_ADDBJ(@RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                                @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
                                                @RequestParam(value = "A_ETALON") String A_ETALON,
                                                @RequestParam(value = "A_UNIT") String A_UNIT,
                                                @RequestParam(value = "A_PRICE") String A_PRICE,
                                                HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7134_ADDBJ(A_MAT_NO, A_MAT_DESC, A_ETALON, A_UNIT, A_PRICE);
        return result;
    }

    //7134备件删除
    @RequestMapping(value = "/PG_RUN7134_DELETEBJ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PG_RUN7134_DELETEBJ(@RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = zykService.PG_RUN7134_DELETEBJ(A_MAT_NO);
        return result;
    }

    //7134备件删除（删除）
    @RequestMapping(value = "/PRO_RUN7134_DELETEBJ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7134_DELETEBJ(@RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = zykService.PRO_RUN7134_DELETEBJ(A_MAT_NO);
        return result;
    }

    //7134备件导出
    @RequestMapping(value = "/PG_RUN7134_GETBJLIST_TABLE", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PG_RUN7134_GETBJLIST_TABLE(
            @RequestParam(value = "A_MAT_NO") String A_MAT_NO,
            @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
            HttpServletResponse response) throws Exception {

        List list = new ArrayList();

        //原存储过程
        //Map<String, Object> data = zykService.PG_RUN7134_GETBJLIST_TABLE( A_MAT_NO, A_MAT_DESC);
        Map<String, Object> data = zykService.PRO_RUN7134_GETBJLIST( A_MAT_NO, A_MAT_DESC);

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
        cell.setCellValue("备件编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("备件名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("计划单价");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 2).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 4).setCellValue(map.get("F_PRICE") == null ? "" : map.get("F_PRICE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("重点备件字典设置.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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
}
