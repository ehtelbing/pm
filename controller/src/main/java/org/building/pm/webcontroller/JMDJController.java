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
                String str=recordEle.elementTextTrim("vch_departName");
                if(str.equals("齐大山铁矿")||str.equals("齐大山选矿厂")||str.equals("大孤山球团厂")
                        ||str.equals("大孤山铁矿")||str.equals("眼前山铁矿")||str.equals("鞍千矿业公司")
                        ||str.equals("东鞍山烧结厂")){
                    Map M = new HashMap();
                    M.put("code",recordEle.elementTextTrim("vch_departCode"));
                    M.put("name",recordEle.elementTextTrim("vch_departName"));
                    M.put("jhn", recordEle.elementTextTrim("i_check_number_jh"));
                    M.put("sjn", recordEle.elementTextTrim("i_check_number_sj"));
                    M.put("rate", recordEle.elementTextTrim("f_exe_rate"));
                    list.add(M);
                }
            }
            // 日志 ---- 日志内容 - 日志报文 - 时间 - 日志类型 - 人员编码
            java.util.Date currentTime = new java.util.Date();
            SimpleDateFormat Format = new SimpleDateFormat("yyyy-MM-dd");
            String titleNameTime = Format.format(currentTime);

            mmService.PRO_LOG_WEB_SET("服务日志:" + jmdjUrl,
                    null, titleNameTime, "JMDJ", "");
            test.put("list", list);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return test;
    }
}
