package org.building.pm.PythonController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.xml.crypto.Data;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;

@Controller
@RequestMapping("/app/pm/defect/")
public class Defect {

    @RequestMapping(value = "DefectSel", method = RequestMethod.POST)
    @ResponseBody
    public void DefectSel() throws IOException, InterruptedException {
        String exe = "python";
        String command = "D:\\JetBrains\\Defect\\defecthanding.py";
        String[] cmdArr = new String[]{exe, command};
        Process process = Runtime.getRuntime().exec(cmdArr);

        InputStream is=process.getInputStream();
        DataInputStream dis=new DataInputStream(is);
        String str=dis.readLine();
        process.waitFor();
        System.out.println(str);
    }
}
