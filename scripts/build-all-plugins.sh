for dir in src/plugins/*/; do
  plugin=$(basename $dir)

  echo="
  🛠️ BUILDING $plugin
  "

  pnpm build $plugin
done
