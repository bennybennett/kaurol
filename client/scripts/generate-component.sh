#!/bin/bash

read -p "Enter component name: " COMPONENT_NAME

# Prompt for sub-folder
SUBFOLDER=""
while [ "$SUBFOLDER" = "" ]; do
    read -p "Enter sub-folder name (press enter for none): " SUBFOLDER
    if [ "$SUBFOLDER" != "" ]; then
        SUBFOLDER_PATH="src/components/$SUBFOLDER/"
        if [ ! -d "$SUBFOLDER_PATH" ]; then
            echo "Sub-folder does not exist."
            SUBFOLDER=""
        fi
    fi
done

# Generate component
if [ "$SUBFOLDER" = "" ]; then
    COMPONENT_PATH="src/components/$COMPONENT_NAME/"
else
    COMPONENT_PATH="src/components/$SUBFOLDER/$COMPONENT_NAME/"
    mkdir -p "$SUBFOLDER_PATH"
fi

mkdir -p "$COMPONENT_PATH"

cat > "$COMPONENT_PATH/$COMPONENT_NAME.tsx" <<EOF
import React from 'react';
import styles from './${COMPONENT_NAME}.module.css';

interface ${COMPONENT_NAME}Props {}

const ${COMPONENT_NAME}: React.FC<${COMPONENT_NAME}Props> = ({}) => {
  return <div className={styles.${COMPONENT_NAME}}>${COMPONENT_NAME}</div>;
};

export default ${COMPONENT_NAME};
EOF

echo "Component $COMPONENT_NAME created in $COMPONENT_PATH$COMPONENT_NAME.tsx"

# Generate CSS file
cat > "$COMPONENT_PATH/${COMPONENT_NAME}.module.css" <<EOF
.${COMPONENT_NAME} {
  /* CSS styles here */
}
EOF

echo "CSS file $COMPONENT_NAME.css created in $COMPONENT_PATH"
