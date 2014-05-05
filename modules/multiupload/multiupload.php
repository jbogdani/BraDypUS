<?php
/**
 * @author			Julian Bogdani <jbogdani@gmail.com>
 * @copyright		BraDypUS 2007-2012
 * @license			See file LICENSE distributed with this code
 * @since			Aug 11, 2012
 */

class multiupload_ctrl extends Controller
{
	
	public function loadFiles()
	{
		$this->render('multiupload', 'loadFiles', array(
				'tr'	=> new tr(),
				'uid'	=> uniqid('multiupload')
				));
	}
	
	public function saveUploads()
	{
		$dir = PROJ_TMP_DIR . $this->get['upload_dir'] . '/';
		
		
		if (!is_dir($dir))
		{
			mkdir($dir, 0777, true);
		}
		
		$file_ctrl = new file_ctrl();
		$file_ctrl->upload_args($dir);
	}
	
	/**
	 * 
	 * @param string $this->get['dir']
	 * TODO: fare in modo che quando non si trovano collegamenti nel nome del file ci sia la possibilità di inserirli manualmente!
	 */
	public function showPreview()
	{
		$dirContent = utils::dirContent($this->get['dir']);
		
		if (!$dirContent)
		{
			echo '<h2>' . tr::sget('no_files_found', $dir) . '</h2>';
			return;
		}
		
		$data = array();
		
		foreach ($dirContent as $x => $file)
		{
			$data[$x]['file'] = $file;
			$data[$x]['path'] = $this->get['dir'];
			$data[$x]['fData'] = parseFilename::parse($this->get['dir'] . $file);
			
			if (is_string($data[$x]['fData']['id']))
			{
				$data[$x]['fData']['id'] = (array)$data[$x]['fData']['id']; 
			}
		}
		$this->render('multiupload', 'previewUploaded', array(
				'tr'	=> new tr(),
				'uid'	=> uniqid('preview_uploaded'),
				'data'	=> $data
				));
		
	}
	
	/**
	 * 
	 * @param array $this->post
	 * @throws myException
	 */
	public function save()
	{
		foreach($this->post['f'] as $row)
		{
			try
			{
				$record = new Record(PREFIX . '__files', false, new DB());
				
				$record->setTmpFolder($row['path']);
				
				$core_data = array(
						PREFIX . '__files' => array(
								'filename'	=> str_replace('.' . $row['ext'], null, $row['filename']),
								'ext'		=> $row['ext']
								)
						);
				$record->setCore($core_data);
				
				if (!$record->persist())
				{
					throw new myException($row['filename'] . '.' . $row['ext'] . ' could not be saved in database');
				}
				
				if ($row['tb'] && is_array($row['id']))
				{
					foreach($row['id'] as $id_dest)
					{
						$userlinks_id[] = $record->addUserLink($row['tb'], $id_dest);
					}
					if (count($userlinks_id) < count($row['id']))
					{
						throw new myException($row['filename'] . '.' . $row['ext'] . ' was saved in database and file was copied, but not all links were saved (only ' . count($userlinks_id) . ' of ' . count($row['id']) . ')');
					}
				}
			}
			catch (myException $e)
			{
				$e->log();
				$error[] = true;
			}
			
		}
		
		if (is_array($error) && count($error) == count($this->post['f']))
		{
			echo json_encode(array('status'=>'error', 'text'=>tr::get('error_data_save')));
		}
		else if (is_array($error) && count($error) > 0)
		{
			echo json_encode(array('status'=>'error', 'text'=>tr::get('partial_data_save')));
		}
		else
		{
			echo json_encode(array('status'=>'success', 'text'=>tr::get('ok_data_save')));
		}
	}
}