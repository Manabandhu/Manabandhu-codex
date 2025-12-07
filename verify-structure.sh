#!/bin/bash
# Verification script for ManaBandhu codebase

echo "🔍 Verifying ManaBandhu Structure..."
echo ""

# Check essential directories
echo "📁 Checking directories..."
dirs=("apps/mobile" "backend/src" "packages/types" "packages/ui" "packages/utils" "docs" "infra")
for dir in "${dirs[@]}"; do
  if [ -d "$dir" ]; then
    echo "  ✅ $dir"
  else
    echo "  ❌ $dir MISSING"
  fi
done
echo ""

# Check no duplicate apps
echo "🗑️  Checking for removed duplicates..."
if [ ! -d "apps/web" ]; then
  echo "  ✅ apps/web removed (correct)"
else
  echo "  ❌ apps/web still exists"
fi
echo ""

# Check backend modules
echo "🏗️  Checking backend modules..."
modules=("auth" "user" "room" "ride" "job" "chat" "marketplace" "health" "finance" "social" "ai" "notifications" "search")
for mod in "${modules[@]}"; do
  if [ -d "backend/src/main/java/com/manabandhu/$mod" ]; then
    echo "  ✅ $mod"
  else
    echo "  ❌ $mod MISSING"
  fi
done
echo ""

# Check frontend screens
echo "📱 Checking frontend screens..."
screens=("app/(auth)/login.tsx" "app/(main)/index.tsx" "app/marketplace/index.tsx" "app/health/index.tsx" "app/ai/index.tsx" "app/social/index.tsx")
cd apps/mobile
for screen in "${screens[@]}"; do
  if [ -f "$screen" ]; then
    echo "  ✅ $screen"
  else
    echo "  ❌ $screen MISSING"
  fi
done
cd ../..
echo ""

# Check documentation
echo "📚 Checking documentation..."
docs=("README.md" "complete-features.md" "api-complete.md" "er-diagram.md" "deployment-complete.md" "COMPLETION-REPORT.md")
for doc in "${docs[@]}"; do
  if [ -f "docs/$doc" ]; then
    echo "  ✅ $doc"
  else
    echo "  ❌ $doc MISSING"
  fi
done
echo ""

# Check for removed files
echo "🧹 Checking removed files..."
removed=("docs/services.md" "docs/architecture.md" "docs/user-flows.md" "docs/fonts-setup.md" "apps/mobile/app/(main)/finance-enhanced.tsx" "apps/mobile/app/(main)/immigration-enhanced.tsx")
for file in "${removed[@]}"; do
  if [ ! -f "$file" ]; then
    echo "  ✅ $file removed (correct)"
  else
    echo "  ❌ $file still exists"
  fi
done
echo ""

# Count screens
echo "📊 Statistics..."
screen_count=$(find apps/mobile/app -name "*.tsx" -type f | wc -l)
echo "  Total screens: $screen_count"

backend_controllers=$(find backend/src/main/java -name "*Controller.java" -type f | wc -l)
echo "  Backend controllers: $backend_controllers"

type_files=$(find packages/types/src -name "*.ts" -type f | wc -l)
echo "  Type definitions: $type_files"

echo ""
echo "✅ Verification complete!"
