package org.building.pm.base;

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
}
