<?php
/**
 * @author			Julian Bogdani <jbogdani@gmail.com>
 * @copyright		BraDypUS, Julian Bogdani <jbogdani@gmail.com>
 * @license			See file LICENSE distributed with this code
 * @since			Jan 10, 2012
 */

class autoloader
{
    public function __construct()
    {
        spl_autoload_register(array($this, 'loader'));
    }

    private function loader($className)
    {
        if (class_exists($className)) {
            return true;
        }
        if (is_file(LIB_DIR . 'vendor/' . str_replace('\\', '/', $className) . '.php')) {

            require_once LIB_DIR . 'vendor/' . str_replace('\\', '/', $className) . '.php';

        } elseif (preg_match('/_ctrl/', $className)) {

            $mod = str_replace('_ctrl', null, $className);

            if (file_exists(MOD_DIR . $mod . '/' . $mod . '.php')) {
                require_once MOD_DIR . $mod . '/' . $mod . '.php';
            }

        } else {

            if (file_exists(LIB_DIR . $className . '.inc')) {
                require_once LIB_DIR . $className . '.inc';
            } elseif (file_exists(LIB_DIR . $className . '.php')) {
                require_once LIB_DIR . $className . '.php';
            } elseif (file_exists(LIB_DIR . str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php')) {
                require_once LIB_DIR . str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php';
            } elseif (file_exists(MOD_DIR . '/' . $className . '/' . $className . '.php')) {
                require_once MOD_DIR . '/' . $className . '/' . $className . '.php';
            } elseif (file_exists(LIB_DIR . 'interfaces/' . $className . '.inc')) {
                require_once LIB_DIR . 'interfaces/' . $className . '.inc';
            } elseif (file_exists(LIB_DIR . 'interfaces/' . $className . '.php')) {
                require_once LIB_DIR . 'interfaces/' . $className . '.php';
            } else {
                return false;
            }
        }
    }
}
