var settings_dir = fb.ProfilePath + "FoObloud!\\Scripts\\";
// ===============================================================================/ update_option
function update_option(optname, optvalue) {
    var fso, f1, ts, s;
    var ForReading = 1;
    var ForWriting = 2;
    fso = new ActiveXObject("Scripting.FileSystemObject");

    // Read the contents of the txt file
    ts = fso.OpenTextFile(settings_dir + optname + ".txt", ForReading);
    s = ts.ReadLine();
    ts.Close();
    // renaming the empty file used after in the PSS with the new value
    f1 = fso.MoveFile(settings_dir + optname + "_" + s, settings_dir + optname + "_" + optvalue);
    // updating the txt file with the new value
    ts = fso.OpenTextFile(settings_dir + optname + ".txt", ForWriting);
    ts.WriteLine(optvalue);
    ts.Close();
    return optvalue;
}

// ===============================================================================/ read_option
function read_option(optname, initvalue) {
    var fso, ts, ts2, s;
    var ForReading = 1;
    var ForWriting = 2;
    fso = new ActiveXObject("Scripting.FileSystemObject");

    if (file_exists(settings_dir + optname + ".txt") == true) {
        ts = fso.OpenTextFile(settings_dir + optname + ".txt", ForReading);
        s = ts.ReadLine();
        ts.Close();
        return s;
    } else {
        ts = fso.CreateTextFile(settings_dir + optname + ".txt", ForWriting);
        ts.WriteLine(initvalue);
        ts.Close();
        ts2 = fso.CreateTextFile(settings_dir + optname + "_" + initvalue, ForWriting);
        ts2.Close();
        return initvalue;
    }
}

// ===============================================================================/ folder_exists
function folder_exists(chemin) {
    var fso, bool;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    bool = fso.FolderExists(chemin);
    return bool;
}

// ===============================================================================/ file_exists
function file_exists(chemin) {
    var fso, bool;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    bool = fso.Fileexists(chemin);
    return bool;
}