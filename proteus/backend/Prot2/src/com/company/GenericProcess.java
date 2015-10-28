package com.company;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Created by stevenfrancus on 10/15/15.
 */
public class GenericProcess {
    private final String path;
    private String command = "";
    private static DratData dratData;
    private int count = 0;
    public GenericProcess(String path) {

        this.path = path;

    }
    public boolean createProcess(String command) throws IOException {
        this.command = command;
        ProcessBuilder builder = new ProcessBuilder(this.path, command);
        spawnProcess(builder);
        return true;
    }

    public void createData(String path){
        dratData = new DratData(path);
    }
    public boolean createProcess(String command, String canonicalPath) throws IOException {
        this.command = command;
        ProcessBuilder builder = new ProcessBuilder(this.path, command, canonicalPath);

        spawnProcess(builder);

        return true;
    }
    private boolean spawnProcess(ProcessBuilder builder) throws IOException {
        String line;
        builder.environment().putAll(Utils.getEnvironment());
        builder.redirectErrorStream(true);
        Process process = builder.start();

        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        while (true) {
            line = reader.readLine();
            dratData.readData(command, line);
            if (line == null) {
                if(command.equals("go")){
                    count++;
                }else{
                    break;
                }

                if(count == 3){
                    break;
                }

            }
            System.out.println(line);
        }

        return true;
    }
}
