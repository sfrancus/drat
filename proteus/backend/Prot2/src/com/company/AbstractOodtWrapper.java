package com.company;

import java.io.IOException;

/**
 * Created by stevenfrancus on 10/13/15.
 */
public interface AbstractOodtWrapper {
    public boolean run() throws IOException;
    public boolean reset() throws IOException;
    public boolean stop() throws IOException;
}
