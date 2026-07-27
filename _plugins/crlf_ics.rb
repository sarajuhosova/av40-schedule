Jekyll::Hooks.register :site, :post_write do |site|
  Dir.glob(File.join(site.dest, "**/*.ics")).each do |path|
    content = File.read(path)
    content = content.gsub(/\r\n|\r|\n/, "\r\n")
    File.write(path, content)
  end
end
