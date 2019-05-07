package org.building.pm.webcontroller;

import org.building.pm.wclient.JXWCJG.DTJXWCJG;
import org.building.pm.wclient.JXWCJG.DTJXWCJGRet;
import org.building.pm.wclient.JXWCJG.SIJXWCJGOutSyn;
import org.building.pm.wclient.JXWCJG.SIJXWCJGOutSynService;
import org.building.pm.wclient.WWQX.DTWWQX;
import org.building.pm.wclient.WWQX.DTWWQXRet;
import org.building.pm.wclient.WWQX.SIWWQXOutSyn;
import org.building.pm.wclient.WWQX.SIWWQXOutSynService;
import org.building.pm.webservice.WxjhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.xml.namespace.QName;
import java.net.URL;
import java.sql.SQLException;
import java.util.*;

@Controller
@RequestMapping("/app/pm/wxjh")
public class WxjhController {

    @Autowired
    private WxjhService wxjhService;

    @Value("#{configProperties['DefectPicUrl']}")
    private String DefectPicUrl;

    @Value("#{configProperties['infopub.username']}")
    private String infopubusername;


    /*
     * 检修完成结果下传
     * */
    @RequestMapping(value = "SI_JXWCJG_Out_Syn_PM0014", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SI_JXWCJG_Out_Syn_PM0014(@RequestParam(value = "V_DEFECT_GUID") String V_DEFECT_GUID,
                                                        @RequestParam(value = "V_DEFECT_TYPE") String V_DEFECT_TYPE,
                                                        @RequestParam(value = "V_SYSTEM") String V_SYSTEM,
                                                        @RequestParam(value = "V_GUID") String V_GUID,
                                                        @RequestParam(value = "V_STR01") String V_STR01,
                                                        @RequestParam(value = "V_STR02") String V_STR02,
                                                        @RequestParam(value = "V_STR03") String V_STR03,
                                                        @RequestParam(value = "V_STR04") String V_STR04,
                                                        @RequestParam(value = "V_STR05") String V_STR05) throws SQLException {
        Map result = new HashMap();

        try {
            DTJXWCJG dtjxwcjg = new DTJXWCJG();
            List<DTJXWCJG.Items> list = new ArrayList<DTJXWCJG.Items>();
            DTJXWCJG.Items items = new DTJXWCJG.Items();
            V_SYSTEM=infopubusername;

            String path = this.getClass().getClassLoader().getResource("").getPath().toString() + "fwsdl/SI_JXWCJG_Out_Syn_PM0014.wsdl";

            items.setVDEFECTGUID(V_DEFECT_GUID);
            items.setVDEFECTTYPE(V_DEFECT_TYPE);
            items.setVSYSTEM(V_SYSTEM);
            items.setVGUID(V_GUID);
            items.setVSTR01(V_STR01);
            items.setVSTR02(V_STR02);
            items.setVSTR03(V_STR03);
            items.setVSTR04(V_STR04);
            items.setVSTR05(V_STR05);

            list.add(items);

            dtjxwcjg.setItems(list);

            URL url = new URL("file:" + path);
            QName name = new QName("http://www.anshanmining.com/EAM_PM/", "MT_JXWCJG");
            SIJXWCJGOutSynService sijxwcjgOutSynService = new SIJXWCJGOutSynService(url, name);
            SIJXWCJGOutSyn soap = sijxwcjgOutSynService.getSIJXWCJGOutSynPort();

           /* ClassPathResource res = new ClassPathResource("config.properties");
            Properties pros = new Properties();
            pros.load(res.getInputStream());

            BindingProvider bp = (BindingProvider) soap;
            bp.getRequestContext().put(BindingProvider.USERNAME_PROPERTY, pros.getProperty("zkmm1003.username").trim().toString());//用户名
            bp.getRequestContext().put(BindingProvider.PASSWORD_PROPERTY, pros.getProperty("zkmm1003.password").trim().toString());
            bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, pros.getProperty("zkmm1003.returnUrl").trim().toString());*/

            DTJXWCJGRet ret = soap.siJXWCJG(dtjxwcjg);
            if (ret.getVTYPE().equals("S")) {
                result = wxjhService.WebServiceLog(V_SYSTEM, V_DEFECT_GUID, "成功", "检修完成结果下传WebService成功，信息插入成功！唯一值为缺陷guid" + V_DEFECT_GUID + "接口返回信息为：" + ret.getVINFO());
                result.put("type", ret.getVTYPE());
                result.put("info", ret.getVINFO());
            } else {
                result = wxjhService.WebServiceLog(V_SYSTEM, V_DEFECT_GUID, "失败", "检修完成结果下传WebService失败，信息插入成功！唯一值为缺陷guid" + V_DEFECT_GUID + "接口返回信息为：" + ret.getVINFO());

                result.put("type", ret.getVTYPE());
                result.put("info", ret.getVINFO());
            }
        } catch (Exception e) {
            e.printStackTrace();
            result = wxjhService.WebServiceLog(V_SYSTEM, V_DEFECT_GUID, "失败", "检修完成结果下传WebService失败，信息插入成功！唯一值为缺陷guid" + V_DEFECT_GUID + "错误信息为：" + e.getMessage());
            result.put("type", "E");
            result.put("info", e.getMessage());
        }
        return result;

    }

    /*
     * 委外缺陷信息下传
     * */
    @RequestMapping(value = "SI_WWQX_Out_Syn_PM0011", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SI_WWQX_Out_Syn_PM0011(@RequestParam(value = "PROJECT_GUID_DATA") String[] PROJECT_GUID_DATA) throws SQLException {

        Map result = new HashMap();

        String V_V_PROJECT_GUID = "";
        try {
            DTWWQX dtwwqx = new DTWWQX();
            List<DTWWQX.Items> dlist = new ArrayList<DTWWQX.Items>();
            DTWWQX.Items items = new DTWWQX.Items();


            for (int i = 0; i < PROJECT_GUID_DATA.length; i++) {
                if (i == 0) {
                    V_V_PROJECT_GUID = PROJECT_GUID_DATA[i];
                } else {
                    V_V_PROJECT_GUID = V_V_PROJECT_GUID + "," + PROJECT_GUID_DATA[i];
                }
            }

            Map data = wxjhService.PM_DEFECT_LOG_FROMPRO_DEFECT_S(V_V_PROJECT_GUID);
            List list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);
                items.setVBILLADD(map.get("V_BILL_ADD").toString());
                items.setVBILLCODE(map.get("V_BILL_CODE").toString());
                items.setVCPZL(map.get("V_CPZL").toString());
                items.setVDEFECTDATE(map.get("V_DEFECTDATE").toString());
                items.setVDEFECTGUID(map.get("V_DEFECTGUID").toString());
                items.setVDEFECTLIST(map.get("V_DEFECTLIST").toString());
                items.setVDEFECTPERCODE(map.get("V_DEFECTPERCODE").toString());
                items.setVDEFECTSOL(map.get("V_DEFECT_SOL").toString());
                items.setVDEPTCODE(map.get("V_DEPTCODE").toString());
                items.setVEQUMAIN(map.get("V_EQU_MAIN").toString());
                items.setVEQUMAINCODE(map.get("V_EQU_MAIN_CODE").toString());
                items.setVEQUNAME(map.get("V_EQU_NAME").toString());
                items.setVEUQCODE(map.get("V_EUQ_CODE").toString());
                items.setVFILES(DefectPicUrl + map.get("V_DEFECTGUID").toString());
                items.setVJHLB(map.get("V_JHLB").toString());
                items.setVMEMO(map.get("V_MEMO").toString());
                items.setVMONTH(map.get("V_MONTH").toString());
                items.setVORGCODE(map.get("V_ORGCODE").toString());
                items.setVSCLB(map.get("V_SCLB").toString());
                items.setVSPECIALTY(map.get("V_SPECIALTY").toString());
                items.setVSTR01("");
                items.setVSTR02("");
                items.setVSTR03("");
                items.setVSTR04("");
                items.setVSTR05("");
                items.setVSYSTEM(map.get("V_SYSTEM").toString());
                items.setVYEAR(map.get("V_YEAR").toString());
                dlist.add(items);
            }
            dtwwqx.setItems(dlist);

            String path = this.getClass().getClassLoader().getResource("").getPath().toString() + "fwsdl/SI_WWQX_Out_Syn_PM0011.wsdl";
            URL url = new URL("file:" + path);
            QName name = new QName("http://www.anshanmining.com/EAM_PM/", "MT_WWQX");
            SIWWQXOutSynService siwwqxOutSynService = new SIWWQXOutSynService(url, name);
            SIWWQXOutSyn soap = siwwqxOutSynService.getSIWWQXOutSynPort();

            DTWWQXRet ret = soap.siWWQX(dtwwqx);

            if (ret.getVTYPE().equals("S")) {
                result = wxjhService.WebServiceLog("AKSB", V_V_PROJECT_GUID, "成功", "检修完成结果下传WebService成功，信息插入成功！唯一值为维修计划申请guid" + V_V_PROJECT_GUID + "接口返回信息数量为：" + dtwwqx.getItems().size());
                result.put("type", ret.getVTYPE());
                result.put("info", ret.getVINFO());
            } else {
                result = wxjhService.WebServiceLog("AKSB", V_V_PROJECT_GUID, "失败", "检修完成结果下传WebService失败，信息插入成功！唯一值为维修计划申请guid" + V_V_PROJECT_GUID + "接口返回信息数量为：" + dtwwqx.getItems().size());

                result.put("type", ret.getVTYPE());
                result.put("info", ret.getVINFO());
            }
        } catch (Exception e) {
            e.printStackTrace();
            result = wxjhService.WebServiceLog("AKSB", V_V_PROJECT_GUID, "失败", "检修完成结果下传WebService失败，信息插入成功！唯一值为维修计划申请guid" + V_V_PROJECT_GUID + "错误信息为：" + e.getMessage());
            result.put("type", "E");
            result.put("info", e.getMessage());
        }
        return result;

    }

}
