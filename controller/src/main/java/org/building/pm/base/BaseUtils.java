package org.building.pm.base;

import java.io.*;

public class BaseUtils {
    /**
     * 获取文件名称
     *
     * @param filePath
     *        文件路径
     * @return
     */
    public static String getFileName(String filePath) {
        String filePaths[] = filePath.split("[\\\\|/]");
        return filePaths[filePaths.length - 1];
    }

    /**
     * 深度克隆
     *
     * @param object
     * @return
     */
    public static Object deepClone(Object object) {
        try {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteArrayOutputStream);
            if (object != null) {
                objectOutputStream.writeObject(object);
            }

            ObjectInputStream objectInputStream = new ObjectInputStream(new ByteArrayInputStream(byteArrayOutputStream.toByteArray()));
            return (Serializable) objectInputStream.readObject();
        }
        catch (Exception e) {
            return null;
        }
    }

}
