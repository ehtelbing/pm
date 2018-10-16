package org.building.pm.webcontroller;

/*
 * 大修工程接口
 * */

import org.building.pm.webservice.WxjhService;
import org.codehaus.xfire.client.Client;
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
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/app/pm/project")
public class WxjhController {

    @Value("#{configProperties['project.url']}")
    private String projectUrl;

    @Autowired
    private WxjhService wxjhService;

    /*
     * 大修各厂矿年预算
     * */
    @RequestMapping(value = "YearDataSet", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> YearDataSet(@RequestParam(value = "V_V_GUID") String[] V_V_GUID)
            throws SQLException {
        Map result = new HashMap();
        try {
            Client client = new Client(new URL(projectUrl));

            System.out.println(V_V_GUID);

           // Object[] results = client.invoke("web_budgetyear_getbybm", new Object[]{V_V_YEAR, "990020"});

           // Document doc = DocumentHelper.parseText(results[0].toString());

           // Element rootElt = doc.getRootElement();
          //  Iterator iter = rootElt.elementIterator("budgetyear");
            String setret = "";
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
