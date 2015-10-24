package com.company;

import org.w3c.dom.ranges.DocumentRange;

import java.io.IOException;

/**
 * Created by stevenfrancus on 10/13/15.
 */
public class Start {
    static int fileCount = 0;
    private static AbstractDratWrapper dratWrapper = new ProcessDratWrapper();
    private static AbstractOodtWrapper oodtWrapper = new ProcessOodtWrapper();

    public static void main(String[] args) {
        String dratPath = FileConstants.DRAT_SRC;

        try {
            restartOodt();
            restartDrat();
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
    public static void restartOodt() throws IOException {
        oodtWrapper.stop();
        oodtWrapper.reset();
        oodtWrapper.run();
    }
    public static void restartDrat() throws Exception {
        dratWrapper.crawl();
        dratWrapper.index();
        dratWrapper.map();
        dratWrapper.reduce();
    }
}
