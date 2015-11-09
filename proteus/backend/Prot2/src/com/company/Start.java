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

          //  finishJob();
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
    public static boolean restartOodt() throws IOException {
        oodtWrapper.stop();
        try {
            Thread.sleep(5000);
        } catch(InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
        oodtWrapper.reset();
        try {
            Thread.sleep(5000);
        } catch(InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
        oodtWrapper.run();
        try {
            Thread.sleep(5000);
        } catch(InterruptedException ex) {
            Thread.currentThread().interrupt();
        }

        return true;
    }
    public static boolean restartDrat() throws Exception {

        dratWrapper.crawl();
        try {
            Thread.sleep(5000);
        } catch(InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
        dratWrapper.index();
        try {
            Thread.sleep(5000);
        } catch(InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
        dratWrapper.map();
        try {
            Thread.sleep(5000);
        } catch(InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
        dratWrapper.reduce();
        try {
            Thread.sleep(5000);
        } catch(InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
        return true;
    }
    public static boolean finishJob() throws Exception {
        oodtWrapper.stop();
        try {
            Thread.sleep(5000);
        } catch(InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
        return true;
    }
}
