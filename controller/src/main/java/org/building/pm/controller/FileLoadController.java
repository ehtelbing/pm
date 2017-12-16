package org.building.pm.controller;

import org.building.pm.service.FileLoadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.util.Map;

@Controller
@RequestMapping("/app/pm/fileload")
public class FileLoadController {
	@Autowired
	private FileLoadService fileLoadService;
	/*上传*/
	@RequestMapping(value = "/uploadImageFile", method = RequestMethod.POST)
	@ResponseBody
	public Map uploadImageFile(@RequestParam(value = "upload") MultipartFile upload,
							 @RequestParam(value = "checktime") String checktime,
							 @RequestParam(value = "checkcount") String checkcount,
							 @RequestParam(value = "bjcode") String bjcode,
							 @RequestParam(value = "usercode") String usercode,
							 @RequestParam(value = "uesrname") String uesrname,
							 @RequestParam(value = "tagid") String tagid,
							 @RequestParam(value = "siteid") String siteid,
							 @RequestParam(value = "tagdesc") String tagdesc,
							 @RequestParam(value = "tagunit") String tagunit,
							 HttpServletRequest request,
							 HttpServletResponse response, ModelMap model) throws Exception {

		String filename = upload.getOriginalFilename();
		String path = request.getSession().getServletContext().getRealPath("upload");
		int length=(int)upload.getSize();
		File targetFile = new File(path, filename);
		if(!targetFile.exists()){
			System.out.println(targetFile);
			targetFile.mkdirs();
		}
		//保存
		try {
			upload.transferTo(targetFile);
		} catch (Exception e) {
			e.printStackTrace();
		}
		model.addAttribute("fileUrl", request.getContextPath()+"/upload/"+filename);
		FileInputStream fis =  new FileInputStream(path+"/"+filename);
		Map result=fileLoadService.pro_run7111_addlog(bjcode, checktime, checkcount, fis,filename, usercode, uesrname,tagid,siteid,tagdesc);
		result.put("success",true);
		return result;
	}
}
