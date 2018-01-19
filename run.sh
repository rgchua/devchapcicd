# OS settings
if [[ "${OSTYPE}" == *"darwin"* ]]; then
	[ -z "$( brew ls --versions findutils )" ] && brew install findutils
	[ -z "$( brew ls --versions coreutils )" ] && brew install coreutils
	READLINK="greadlink"
	XARGS="gxargs"
else
	READLINK="readlink"
	XARGS="xargs"
fi
SCRIPT_PATH=$( ${READLINK} -f $0 )
SCRIPT_DIR=$( dirname $( ${READLINK} -f $0 ) )

# Set directories
cd ${SCRIPT_DIR}

# Run
npm install --no-shrinkwrap
node_modules/.bin/ts-node src/index.ts
