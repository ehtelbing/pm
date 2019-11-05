package org.building.pm.controller;

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
import java.net.MalformedURLException;
import java.net.URL;
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

}
