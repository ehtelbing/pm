package org.building.pm.webcontroller;


import org.building.pm.webservice.BudgetService;
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
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

/*
 * 预算接口
 * */
@Controller
@RequestMapping("/app/pm/budget")
public class BudgetController {

    @Value("#{configProperties['budget.url']}")
    private String budgetUrl;


    @Autowired
    private BudgetService budgetService;
    /*
     * 大修各厂矿年预算
     * */
    @RequestMapping(value = "budgetYear", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> budgetYear(@RequestParam(value = "V_V_YEAR") String V_V_YEAR)
            throws SQLException {
        Map result = new HashMap();
        try {
            Client client = new Client(new URL(budgetUrl));

            Object[] results = client.invoke("web_budgetyear_getbybm", new Object[]{V_V_YEAR, "990020"});

            Document doc = DocumentHelper.parseText(results[0].toString());

            Element rootElt = doc.getRootElement();
            Iterator iter = rootElt.elementIterator("budgetyear");
            String setret = "";
            while (iter.hasNext()) {
                Element recordEle = (Element) iter.next();
                String year = recordEle.elementTextTrim("Cls_i_year");
                String deptcode = recordEle.elementTextTrim("Cls_vch_deptcode");
                String ywfw = recordEle.elementTextTrim("Cls_GSBER");
                String deptname = recordEle.elementTextTrim("Cls_vch_deptname");
                String chargecode = recordEle.elementTextTrim("Cls_vch_chargecode");
                String chargename = recordEle.elementTextTrim("Cls_vch_chargename");
                String money = recordEle.elementTextTrim("Cls_f_money");
                String money_add = recordEle.elementTextTrim("Cls_f_money_add");
                setret = budgetService.PM_PLAN_BUDGET_YEAR_SET(year, ywfw, chargecode, chargename,
                        money, money_add);
            }
            result.put("ret", setret);
        } catch (MalformedURLException e) {
            result.put("ret", "Fail");
            e.printStackTrace();
        } catch (Exception e) {
            result.put("ret", "Fail");
            e.printStackTrace();
        }
        return result;
    }
}
