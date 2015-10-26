package com.company;

import java.io.File;
import java.lang.reflect.Array;
import java.util.ArrayList;

/**
 * Created by junsuhlee on 10/23/15.
 */
public class DratData {
    private int numFileIngested = 0;
    private int numTotalFile = 0;
    private ArrayList<String> nameFileIngested = new ArrayList<String>();
    final int numFileRecentlyIngested = 10;

    private boolean crawlDone = false;

    private boolean indexDone = false;
    private int numFileIndexed = 0;

    private boolean mapDone = false;

    private boolean reduceDone = false;

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

                nameFileIngested.add(split[3]);
                numFileIngested++;

            }
            if (data.startsWith("INFO: Indexing products...")) {
                crawlDone = true;
            }
            if (data.startsWith("INFO: Finished indexing products")) {
                indexDone = true;
            }

            if (indexDone && !mapDone && data.startsWith("Navigate to")){
                mapDone = true;
            }

            if (mapDone && data.startsWith("Navigate to")){
                reduceDone = true;
            }
            if (data.startsWith("INFO: Indexed product:")){
                numFileIndexed++;
            }

        }
    }
    public ArrayList<String> getFilesRecentlyIngested(){
        if(nameFileIngested.size() > numFileRecentlyIngested){

            return new ArrayList<String>(nameFileIngested.subList(nameFileIngested.size() - 11, nameFileIngested.size() - 1));
        }

        return nameFileIngested;

    }
    public String currentPhase(){
        if(!crawlDone){
            return "crawling";
        }else if(!indexDone){
            return "indexing";
        }else if(!mapDone){
            return "mapping";
        }else if(!reduceDone){
            return "reducing";
        }
        return "finished";
    }

}
