#!/bin/bash

# Script untuk mengubah file dan import dari kebab-case ke PascalCase

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to convert kebab-case to PascalCase
kebab_to_pascal() {
    echo "$1" | sed -r 's/(^|-)([a-z])/\U\2/g'
}

# Array of file mappings (old_name:new_name)
declare -A file_mappings=(
    ["avatar.jsx"]="Avatar.jsx"
    ["button.jsx"]="Button.jsx"
    ["card.jsx"]="Card.jsx"
    ["carousel.jsx"]="Carousel.jsx"
    ["dialog.jsx"]="Dialog.jsx"
    ["drawer.jsx"]="Drawer.jsx"
    ["dropdown-menu.jsx"]="DropdownMenu.jsx"
    ["image.jsx"]="Image.jsx"
    ["input.jsx"]="Input.jsx"
    ["label.jsx"]="Label.jsx"
    ["scroll-area.jsx"]="ScrollArea.jsx"
    ["select.jsx"]="Select.jsx"
    ["separator.jsx"]="Separator.jsx"
    ["skeleton.jsx"]="Skeleton.jsx"
    ["switch.jsx"]="Switch.jsx"
    ["tabs.jsx"]="Tabs.jsx"
    ["textarea.jsx"]="Textarea.jsx"
)

# Array of import path mappings (old_path:new_path)
declare -A import_mappings=(
    ["@/components/ui/avatar"]="@/components/ui/Avatar"
    ["@/components/ui/button"]="@/components/ui/Button"
    ["@/components/ui/card"]="@/components/ui/Card"
    ["@/components/ui/carousel"]="@/components/ui/Carousel"
    ["@/components/ui/dialog"]="@/components/ui/Dialog"
    ["@/components/ui/drawer"]="@/components/ui/Drawer"
    ["@/components/ui/dropdown-menu"]="@/components/ui/DropdownMenu"
    ["@/components/ui/image"]="@/components/ui/Image"
    ["@/components/ui/input"]="@/components/ui/Input"
    ["@/components/ui/label"]="@/components/ui/Label"
    ["@/components/ui/scroll-area"]="@/components/ui/ScrollArea"
    ["@/components/ui/select"]="@/components/ui/Select"
    ["@/components/ui/separator"]="@/components/ui/Separator"
    ["@/components/ui/skeleton"]="@/components/ui/Skeleton"
    ["@/components/ui/switch"]="@/components/ui/Switch"
    ["@/components/ui/tabs"]="@/components/ui/Tabs"
    ["@/components/ui/textarea"]="@/components/ui/Textarea"
)

# Function to rename files
rename_files() {
    local ui_dir="./components/ui"
    
    if [ ! -d "$ui_dir" ]; then
        print_error "Directory $ui_dir not found!"
        return 1
    fi
    
    print_status "Renaming files in $ui_dir..."
    
    for old_file in "${!file_mappings[@]}"; do
        local new_file="${file_mappings[$old_file]}"
        local old_path="$ui_dir/$old_file"
        local new_path="$ui_dir/$new_file"
        
        if [ -f "$old_path" ]; then
            print_status "Renaming: $old_file → $new_file"
            mv "$old_path" "$new_path"
        else
            print_warning "File not found: $old_path"
        fi
    done
}

# Function to update import statements in all files
update_imports() {
    print_status "Updating import statements in all files..."
    
    # Find all .js, .jsx, .ts, .tsx files
    find . -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -not -path "./node_modules/*" | while read -r file; do
        local updated=false
        
        for old_import in "${!import_mappings[@]}"; do
            local new_import="${import_mappings[$old_import]}"
            
            # Check if file contains the old import
            if grep -q "$old_import" "$file"; then
                print_status "Updating imports in: $file"
                
                # Update import statements with different quote styles
                sed -i.bak \
                    -e "s|from \"$old_import\"|from \"$new_import\"|g" \
                    -e "s|from '$old_import'|from '$new_import'|g" \
                    -e "s|import(\"$old_import\")|import(\"$new_import\")|g" \
                    -e "s|import('$old_import')|import('$new_import')|g" \
                    "$file"
                
                updated=true
            fi
        done
        
        # Remove backup file if changes were made
        if [ "$updated" = true ]; then
            rm -f "$file.bak"
        fi
    done
}

# Function to verify changes
verify_changes() {
    print_status "Verifying changes..."
    
    local ui_dir="./components/ui"
    
    print_status "Files in $ui_dir:"
    if [ -d "$ui_dir" ]; then
        ls -la "$ui_dir"
    fi
    
    print_status "Checking for remaining kebab-case imports..."
    local remaining=$(find . -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -not -path "./node_modules/*" -exec grep -l "@/components/ui/.*-" {} \; 2>/dev/null)
    
    if [ -n "$remaining" ]; then
        print_warning "Files still containing kebab-case imports:"
        echo "$remaining"
    else
        print_status "✅ All imports updated successfully!"
    fi
}

# Main function
main() {
    print_status "🚀 Starting PascalCase conversion..."
    
    # Create backup
    print_status "Creating backup..."
    cp -r ./components ./components_backup_$(date +%Y%m%d_%H%M%S) 2>/dev/null || print_warning "Could not create backup"
    
    # Rename files
    rename_files
    
    # Update imports
    update_imports
    
    # Verify changes
    verify_changes
    
    print_status "✅ PascalCase conversion completed!"
    print_warning "Note: Please test your application to ensure everything works correctly."
    print_status "💾 Backup created in components_backup_* directory"
}

# Run main function
main "$@"