package com.company;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Created by stevenfrancus on 10/15/15.
 */
public class GenericProcess {
    private final String path;
    private String command;
    private static DratData dratData;
    public GenericProcess(String path) {

        this.path = path;

    }
    public void createProcess(String command) throws IOException {
        ProcessBuilder builder = new ProcessBuilder(this.path, command);
        spawnProcess(builder);
    }
    public void createData(String path){
        dratData = new DratData(path);
    }
    public void createProcess(String command, String canonicalPath) throws IOException {
        this.command = command;
        ProcessBuilder builder = new ProcessBuilder(this.path, command, canonicalPath);
        spawnProcess(builder);
    }
    private void spawnProcess(ProcessBuilder builder) throws IOException {
        String line;
        builder.environment().putAll(Utils.getEnvironment());
        builder.redirectErrorStream(true);
        Process process = builder.start();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        while (true) {
            line = reader.readLine();
            dratData.readData(command,line);
            if (line == null) {
                break;
            }
            System.out.println(line);
        }
    }
}
