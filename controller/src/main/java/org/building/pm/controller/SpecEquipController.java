package org.building.pm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.util.Region;
import org.building.pm.service.HpService;
import org.building.pm.service.SpecEquipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2019-12-17.
 * <p>
 * 特种设备controller
 */
@Controller
@RequestMapping("/app/pm/specEquip")
public class SpecEquipController {

    @Value("#{configProperties['PM_JST']}")
    private String pm_jst;

    @Autowired
    private SpecEquipService specEquipService;
}
