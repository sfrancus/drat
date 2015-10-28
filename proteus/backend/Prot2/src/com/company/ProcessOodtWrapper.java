package com.company;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by stevenfrancus on 10/13/15.
 */
public class ProcessOodtWrapper extends GenericProcess implements AbstractOodtWrapper {
    private static final String OODT = FileConstants.OODT_PATH;
    private static final String DRAT = FileConstants.DRAT_PATH;

    private String line = "";
    public ProcessOodtWrapper() {
        super(OODT);
    }
    public boolean run() throws IOException {
        super.createProcess("start");

        return true;
    }

    public boolean reset() throws IOException {
        final String RM = "rm",
                    RF_OPTIONAL_PARAMS = "-rf";
        initResetProcess(RM, FileConstants.buildDratSubdirectoryPath("/deploy/data/workflow"), RF_OPTIONAL_PARAMS);
        initResetProcess(RM, FileConstants.buildDratSubdirectoryPath("/deploy/filemgr/catalog"), RF_OPTIONAL_PARAMS);
        initResetProcess(RM, FileConstants.buildDratSubdirectoryPath("/deploy/solr/drat/data"), RF_OPTIONAL_PARAMS);
        initResetProcess(RM, FileConstants.buildDratSubdirectoryPath("/deploy/data/archive/*"), RF_OPTIONAL_PARAMS);
        initResetProcess(RM, FileConstants.buildDratSubdirectoryPath("/deploy/data/jobs/*"), RF_OPTIONAL_PARAMS);
        initResetProcess(RM, FileConstants.buildDratSubdirectoryPath("/deploy/workflow/run/cas.workflow.pid"), null);
        initResetProcess(RM, FileConstants.buildDratSubdirectoryPath("/deploy/filemgr/run/cas.filemgr.pid"), null);
        initResetProcess(RM, FileConstants.buildDratSubdirectoryPath("/deploy/resmgr/run/cas.resmgr.pid"), null);
        return true;
    }

    public boolean stop() throws IOException {
        super.createProcess("stop");
        return true;
    }

    private boolean initResetProcess(String command, String path, String optionalParams) throws IOException {
        boolean hasOptionalParams = optionalParams != null;
        ProcessBuilder process = (hasOptionalParams) ? new ProcessBuilder(command, optionalParams, path) :
                new ProcessBuilder(command, path);
        process.environment().putAll(Utils.getEnvironment());
        process.redirectErrorStream(true);

        Process p =  process.start();

        BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
        while (true) {
            line = reader.readLine();
                if (line == null) {
                 break;
                }
            System.out.println(line);
        }
        return true;
    }
}
