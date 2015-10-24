package com.company;

import java.io.File;
import java.util.ArrayList;

/**
 * Created by junsuhlee on 10/23/15.
 */
public class DratData {
    private int numFileIngested = 0;
    private int numTotalFile = 0;
    private ArrayList<String> nameFileIndexed = new ArrayList<String>();
    private boolean crawlDone = false;

    public DratData(String path){
        countFileNumber(path);
    }

    public void countFileNumber(String path) {
        File f = new File(path);
        File[] files = f.listFiles();

        if (files != null)
            for (int i = 0; i < files.length; i++) {
                numTotalFile++;
                File file = files[i];

                if (file.isDirectory()) {
                    countFileNumber(file.getAbsolutePath());
                }
            }
    }
    public void readData(String command, String data) {
        if(data != null) {
            if (data.startsWith("INFO: Successfully ingested product:")) {
                String[] split = data.split(":");

                nameFileIndexed.add(split[3]);
                numFileIngested++;

            }
            if (data.startsWith("INFO: Indexing products...")) {
                crawlDone = true;
            }
        }
    }

}
