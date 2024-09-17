import os
import zipfile

def zip_directory(base_dir, browser, exclude_list):
    os.makedirs('dist', exist_ok=True)
    exclude_list = set(exclude_list)

    def should_include(path):
        rel_path = os.path.relpath(path, base_dir)
        return not any(rel_path.startswith(exclude) for exclude in exclude_list)

    with zipfile.ZipFile(os.path.join(base_dir, f'dist/{browser}.zip'), 'w', zipfile.ZIP_DEFLATED) as zip_file:
        for foldername, subfolders, filenames in os.walk(base_dir):
            subfolders[:] = [f for f in subfolders if should_include(os.path.join(foldername, f))]
            for filename in filenames:
                file_path = os.path.join(foldername, filename)
                if should_include(file_path):
                    arcname = os.path.relpath(file_path, base_dir)
                    zip_file.write(file_path, arcname=arcname)

if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.abspath(__file__))

    exclude_list = ['dist', 'build.py', '.git' ,'.gitignore']
    zip_directory(base_dir, "firefox", exclude_list)
