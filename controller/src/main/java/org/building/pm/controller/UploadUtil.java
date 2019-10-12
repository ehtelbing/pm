package org.building.pm.controller;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;


/**
 *
 * 上传图片　工具类 大图片路径,生成小图片路径, 大图片文件名,生成小图片文名, 生成小图片宽度,生成小图片高度, 是否等比缩放(默认为true))
 *
 * @author Administrator
 *
 */
public class UploadUtil
{

    private String imagePath ;

    public void uploadImage1(HttpServletRequest request,MultipartFile file, String getUploadContentType, String getUploadFileName,String V_V_GUID,String V_V_PICGUID) throws IOException
    {
        imagePath = "/WEB-INF/images/pm_dxgc_wwjx/" + V_V_GUID + "";// 配置图片路径
        String getImagePath = request.getSession().getServletContext().getRealPath(imagePath);
        String path = StringUtils.substringBefore(getImagePath, "web");
        String path2 = path + "ui\\src\\main\\webapp\\WEB-INF\\images\\pm_dxgc_wwjx\\"+V_V_GUID + "";
        System.out.println("新路径测试="+path2);
        System.out.println("getImagePath++++++++" + getImagePath);

        File image = new File(getImagePath);
        if (!image.exists())
        {
            image.mkdir();
        }

        // 得到上传文件的后缀名
        String uploadName = getUploadContentType;
        System.out.println("图片类型 ------------" + uploadName);

        String lastuploadName = uploadName.substring(uploadName.indexOf("/") + 1, uploadName.length());
        System.out.println("得到上传文件的后缀名 ------------" + lastuploadName);

        // 得到文件的新名字
        String fileNewName = generateFileName(getUploadFileName,V_V_GUID,V_V_PICGUID);
        String fileNewName2 = generateFileName2(getUploadFileName,V_V_GUID,V_V_PICGUID);

        System.out.println("// 得到文件的新名字 ------------" + fileNewName);
        System.out.println("// 得到缩略图文件名字 ------------" + fileNewName2);


        // FileOutputStream fos = new FileOutputStream(getImagePath + "/" +
        // fileNewName);
        //
        // FileInputStream fis = new FileInputStream(getUpload);
        // byte[] buffer = new byte[1024];
        // int len = 0;
        // while ((len = fis.read(buffer)) > 0) {
        // fos.write(buffer, 0, len);
        // }

        // 最后返回图片路径
        String imagePath2 = imagePath + "/" + fileNewName2;
        imagePath = imagePath + "/" + fileNewName;

        System.out.println(" 回图片路径   " + file.getInputStream());
        System.out.println("        //最后返回图片路径   " + imagePath);
        System.out.println("        //最后返回缩略图片路径   " + imagePath2);

        BufferedImage srcBufferImage = ImageIO.read(file.getInputStream());
        System.out.println(" w " + srcBufferImage.getWidth() + " w " + srcBufferImage.getHeight());
        BufferedImage scaledImage;
        ScaleImage scaleImage = ScaleImage.getInstance();

        int yw = srcBufferImage.getWidth();
        int yh = srcBufferImage.getHeight();
        System.out.println("yw++++++++++"+yw);
        System.out.println("yh++++++++++"+yh);

        int w = 400, h = 300;
        // 如果上传图片 宽高 比 压缩的要小 则不压缩


        //在服务器上生成原图片文件
        //scaledImage = scaleImage.imageZoomOut(srcBufferImage, w, h);
        // FileOutputStream out = new FileOutputStream(getImagePath + "/" + fileNewName);
        //ImageIO.write(scaledImage, "jpeg", out);


        //在服务器上生成压缩图片文件
       // System.out.println("22222222222222222222222222222222222222222222222222222"+getImagePath + "/" + fileNewName);
        FileOutputStream fos = new FileOutputStream(getImagePath + "/" + fileNewName);

        FileInputStream fis = (FileInputStream) file.getInputStream();
        byte[] buffer = new byte[1024];
        int len = 0;
        while ((len = fis.read(buffer)) > 0)
        {
            fos.write(buffer, 0, len);
        }

        scaledImage = scaleImage.imageZoomOut(srcBufferImage, w, h);
        FileOutputStream out2 = new FileOutputStream(getImagePath + "/" + fileNewName2);
        ImageIO.write(scaledImage, "jpeg", out2);


    }


    private String generateFileName(String fileName,String V_V_GUID,String V_V_PICGUID)
    {
            /*DateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
            String formatDate = format.format(new Date());  
            int random = new Random().nextInt(10000);  */
        int position = fileName.lastIndexOf(".");
        String extension = fileName.substring(position);
        return V_V_PICGUID + extension;
    }

    private String generateFileName2(String fileName,String V_V_GUID,String V_V_PICGUID)
    {
            /*DateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
            String formatDate = format.format(new Date());
            int random = new Random().nextInt(10000);  */
        int position = fileName.lastIndexOf(".");
        String extension = fileName.substring(position);
        return "thumb_" + V_V_PICGUID + extension;
    }

    public String getImagepath()
    {
        return imagePath;
    }

}