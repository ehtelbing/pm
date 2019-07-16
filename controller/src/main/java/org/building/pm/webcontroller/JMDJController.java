package org.building.pm.webcontroller;

import org.building.pm.webservice.MMService;
import org.codehaus.xfire.client.Client;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.*;

/*
 * 精密点检接口
 * */
@Controller
@RequestMapping("/app/pm/jMDJ")
public class JMDJController {

    @Value("#{configProperties['jmdj.url']}")
    private String jmdjUrl;
    @Autowired
    private MMService mmService;
    /*
     * 精密点检数据
     * */
    @RequestMapping(value = "wordTicket", method = RequestMethod.POST)
    @ResponseBody
    public Map wordTicket(@RequestParam(value = "V_V_YEAR") String s_year,
                          @RequestParam(value = "V_V_MONTH") String s_month){
        Map test = new HashMap();
        try {
            Client client = new Client(new URL(jmdjUrl));
            Object[] results = client.invoke("Getdate",new Object[]{s_year, s_month});
            Document doc = DocumentHelper.parseText(results[0].toString());
            Element rootElt = doc.getRootElement(); // 获取根节点
            Iterator iter = rootElt.elementIterator("table"); // 获取二级节点
            List<Map> list = new ArrayList<Map>();
            while (iter.hasNext()) {
                Element recordEle = (Element) iter.next(); // 输出下一行
                String str=recordEle.elementTextTrim("vch_departCode");
                if(str.equals("9905")||str.equals("9908")||str.equals("9907")
                        ||str.equals("9902")||str.equals("9904")||str.equals("9906")
                        ||str.equals("9910")){
                    Map M = new HashMap();
                    M.put("code",recordEle.elementTextTrim("vch_departCode"));
                    if(str.equals("9906")){
                        M.put("name","鞍千");
                    }else if(str.equals("9905")){
                        M.put("name","齐矿");
                    }else if(str.equals("9908")){
                        M.put("name","齐选");
                    }else if(str.equals("9907")){
                        M.put("name","大球");
                    }else if(str.equals("9902")){
                        M.put("name","大矿");
                    }else if(str.equals("9904")){
                        M.put("name","眼矿");
                    }else if(str.equals("9910")){
                        M.put("name","东烧");
                    }
                    M.put("jhn", recordEle.elementTextTrim("i_check_number_jh"));
                    M.put("sjn", recordEle.elementTextTrim("i_check_number_sj"));
                    M.put("rate", recordEle.elementTextTrim("f_exe_rate"));
                    list.add(M);
                }
            }
            // 日志 ---- 日志内容 - 日志报文 - 时间 - 日志类型 - 人员编码
            /*java.util.Date currentTime = new java.util.Date();
            SimpleDateFormat Format = new SimpleDateFormat("yyyy-MM-dd");
            String titleNameTime = Format.format(currentTime);
            mmService.PRO_LOG_WEB_SET("服务日志:" + jmdjUrl,
                    null, titleNameTime, "JMDJ", "");*/
            test.put("list", list);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return test;
    }
}
