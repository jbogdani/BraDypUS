<?php

namespace DB\Inspect;

/**
 * Interface to interact with database structure
 */
class Mysql implements InspectInterface
{   
    private $db;

    public function __construct(\DB $db)
    {
        $this->db = $db;
    }

    public function tableExists(string $tb): bool
    {
        $this->db->dont_version();
        $res = $this->db->query(
            "SELECT COUNT(*) as tot FROM information_schema.TABLES WHERE TABLE_NAME = ?",
            [ $tb ]
        );
        $this->db->do_version();
        
        return $res && !empty($res) && $res[0]['tot'] > 0;
    }

    public function tableColumns(string $tb): array
    {
        $ret = [];

        $this->db->dont_version();
        $res = $this->db->query("DESCRIBE {$tb}");
        if (!$res || empty($res)){
            throw new \Exception("Error on getting column list for table {$tb}");
        }

        foreach ($res as $row) {
            $ret[] = [
                'fld' => $row['Field'],
                'type' => $row['Type']
            ];
        }
        $this->db->do_version();

        return $ret;
    }
}