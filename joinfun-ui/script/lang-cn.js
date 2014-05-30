var _lang = 
{   
	'format' : function(key, args)
	{
		var _str = this[key];
		if(!_str)
		{
			return '';
		}
		var _regex = /{\d+}/g;
		var _result = '';
		var _index = '';
		while((_result = _regex.exec(_str)) !=null)
		{
			_index = (_result[0].match(/\d+/) || [])[0];
			_str = _str.replace(_result[0], arguments[++_index] || '');
		}
		return _str;
	},
	'confirm' : '确定',
	'cancel' : '取消',
	'delete' : '删除',
	'download' : '下载',
	'submit' : '提交',
	'submiting' : '正在提交中...',
	'save' : '保存',
	'confirm-submit' : '确定提交？',
	'confirm-delete' : '确定删除记录？',
	'confirm-close' : '确定关闭？',
	'delete-mustone' : '请至少选择一种删除项。',
	'upload-error' : '{0} 文件上传失败。',
	'upload-size-limit' : '上传文件不能大于 {0} 。',
	'upload-count-limit' :'只能上传 {0} 个文件',

	'upload-file-dialog-title' : '上传文件：',
	'plase-choose-file' : '请先选择一个文件。',
	'confirm-delete-file' : '确定删除当前文件？',
	'plase-choose-one-file' : '一次只能{0}一个文件。',
	'delete-file-error' : '删除文件失败！',

	'current-activity' : '当前节点',
	'current-person' : '当前处理人'

};
